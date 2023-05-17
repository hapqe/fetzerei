import type { vec3 } from "gl-matrix";
import type { Renderer } from "./renderer";
import { GltfLoader } from "gltf-loader-ts";
import type { GlTf } from "gltf-loader-ts/lib/gltf";
import { draw } from "svelte/types/runtime/transition";

interface RenderingData {
    pipeline: GPURenderPipeline;
    buffers: GPUBuffer[];
    indices: GPUBuffer;
}

export class Scene {
    gltf: GlTf;

    constructor(gltf: GlTf) {
        this.gltf = gltf;
    }

    static async load(path: string, renderer: Renderer) {
        const { device, format } = renderer;

        const loader = new GltfLoader();
        const asset = await loader.load(path);
        const gltf = asset.gltf;

        const modules: GPUShaderModule[] = [];
        for (const material of gltf.materials || []) {
            const shader = await (await fetch('shaders/unlit.wgsl')).text();

            modules.push(device.createShaderModule({
                label: material.name,
                code: shader,
            }));
        }

        for (const mesh of gltf.meshes) {
            const primitive = mesh.primitives[0];

            const buffers: GPUBuffer[] = [];
            const layouts: GPUVertexBufferLayout[] = [];

            for (const [index, attribute] of Object.values(primitive.attributes).entries() || []) {
                const accessor = gltf.accessors[attribute];
                const view = gltf.bufferViews[accessor.bufferView];

                const buffer = device.createBuffer({
                    size: view.byteLength,
                    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
                });
                const data = await asset.accessorData(attribute);
                device.queue.writeBuffer(buffer, 0, data);
                buffers.push(buffer);

                const format = accessor.type === "VEC3" ? "float32x3" : "float32x2";
                const stride = accessor.type === "VEC3" ? 12 : 8;

                layouts.push({
                    arrayStride: stride,
                    stepMode: "vertex",
                    attributes: [{
                        shaderLocation: index,
                        offset: 0,
                        format: format,
                    }],
                });
            }

            const indicesData = await asset.accessorData(primitive.indices);
            const lenght = indicesData.byteLength + indicesData.byteLength % 4;
            const padded = new Uint8Array(lenght);

            const indicesBuffer = device.createBuffer({
                size: lenght,
                usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
            });

            padded.set(indicesData);

            device.queue.writeBuffer(indicesBuffer, 0, padded);


            const pipeline = device.createRenderPipeline({
                label: mesh.name,
                layout: "auto",
                vertex: {
                    module: modules[primitive.material],
                    entryPoint: "vertexMain",
                    buffers: layouts,
                },
                fragment: {
                    module: modules[primitive.material],
                    entryPoint: "fragmentMain",
                    targets: [{
                        format,
                    }],
                },
                primitive: {
                    topology: "triangle-list",
                    cullMode: "none"
                },
            });

            const renderingData: RenderingData = {
                pipeline,
                buffers,
                indices: indicesBuffer,
            };

            mesh.renderingData = renderingData;
        }

        return new Scene(gltf);
    }

    draw(pass: GPURenderPassEncoder) {
        const gltf = this.gltf;

        for (const mesh of gltf.meshes) {
            const { pipeline, buffers, indices } = mesh.renderingData as RenderingData;

            pass.setPipeline(pipeline);
            for (let i = 0; i < buffers.length; i++) {
                pass.setVertexBuffer(i, buffers[i]);
            }
            pass.setIndexBuffer(indices, "uint16");
            pass.drawIndexed(gltf.accessors[mesh.primitives[0].indices].count, 1, 0, 0, 0);
        }
    }
}
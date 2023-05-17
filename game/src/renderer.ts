import type { Enqueueable, Scene } from "./scene";

export class Renderer {
    adapter: GPUAdapter;
    context: GPUCanvasContext;
    device: GPUDevice;
    format: GPUTextureFormat;
    onRender: Set<Enqueueable> = new Set();

    static async create(canvas: HTMLCanvasElement) {
        if (!navigator.gpu) throw new Error("WebGPU not supported");

        const adapter = await navigator.gpu.requestAdapter();

        if (!adapter) throw new Error("No adapter found");

        const device = await adapter.requestDevice();
        const context = canvas.getContext("webgpu");
        const format = navigator.gpu.getPreferredCanvasFormat();

        context.configure({
            device,
            format,
            alphaMode: "premultiplied",
        });

        const encoder = device.createCommandEncoder();

        device.queue.submit([encoder.finish()]);

        const renderer = new Renderer();
        renderer.adapter = adapter;
        renderer.context = context;
        renderer.device = device;
        renderer.format = format;
        return renderer;
    }

    render() {
        const encoder = this.device.createCommandEncoder();

        const pass = encoder.beginRenderPass({
            colorAttachments: [
                {
                    clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 0.0 },
                    view: this.context.getCurrentTexture().createView(),
                    loadOp: "clear",
                    storeOp: "store",
                },
            ],
        });

        this.onRender.forEach((renderable) => renderable.enqueue(pass));

        pass.end();

        this.device.queue.submit([encoder.finish()]);
    }
}
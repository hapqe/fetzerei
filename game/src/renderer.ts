export class Renderer {
    adapter: GPUAdapter;
    encoder: GPUCommandEncoder;
    context: GPUCanvasContext;
    device: GPUDevice;
    format: GPUTextureFormat;

    constructor(adapter: GPUAdapter, encoder: GPUCommandEncoder, context: GPUCanvasContext, device: GPUDevice, format: GPUTextureFormat) {
        this.adapter = adapter;
        this.encoder = encoder;
        this.context = context;
        this.device = device;
        this.format = format;
    }

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

        return new Renderer(adapter, encoder, context, device, format);
    }
}
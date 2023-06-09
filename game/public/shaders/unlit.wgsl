struct VertexInput {
    @location(0) pos: vec3f,
    @location(1) uv: vec2f,
    @location(2) normal: vec3f,
}

struct VertexOut {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f
}

@group(0) @binding(0)
var<uniform> mvp: mat4x4f;

@vertex
fn vertexMain(in: VertexInput) -> VertexOut {
    var out: VertexOut;
    out.position = mvp * vec4f(in.pos, 1);
    out.uv = in.uv;
    return out;
}

@fragment
fn fragmentMain(in: VertexOut) -> @location(0) vec4f {
    return vec4f(in.uv, 0, 1); // (Red, Green, Blue, Alpha)
}
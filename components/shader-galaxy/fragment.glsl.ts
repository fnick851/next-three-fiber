const points = [
  /*glsl*/ `
    // Disc
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = step(0.5, strength);
    strength = 1.0 - strength;
`,
  /*glsl*/ `
    // Diffuse point
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength *= 2.0;
    strength = 1.0 - strength;
`,
  /*glsl*/ `
    // Light point
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 10.0);
`,
]

export function fragmentShader(point: number): string {
  return /*glsl*/ `

    varying vec3 vColor;

    void main()
    {
        ${points[point]}

        // Final color
        vec3 color = mix(vec3(0.0), vColor, strength);
        gl_FragColor = vec4(color, 1.0);
    }
    
    `
}

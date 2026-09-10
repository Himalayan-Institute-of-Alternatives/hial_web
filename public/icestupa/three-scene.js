import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x07111d);
scene.fog = new THREE.FogExp2(0x07111d, 0.008);

const camera = new THREE.PerspectiveCamera(
    42,
    innerWidth / innerHeight,
    0.1,
    500
);
camera.position.set(10, 8, 15);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance"
});
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
renderer.setSize(innerWidth, innerHeight);
renderer.domElement.style.pointerEvents = "auto";
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 7;
controls.maxDistance = 30;
controls.maxPolarAngle = Math.PI * 0.47;
controls.target.set(0, 4.1, 0);

/* ---------- LIGHT ---------- */

const hemi = new THREE.HemisphereLight(
    0xbddcff,
    0x182333,
    1.8
);
scene.add(hemi);

const sun = new THREE.DirectionalLight(0xfff2d2, 3.4);
sun.position.set(-10, 15, 8);
scene.add(sun);

const moonLight = new THREE.DirectionalLight(0x9bb7d4, 0.15);
moonLight.position.set(8, -10, 6);
scene.add(moonLight);

// Three low-power facade lights at the base of the Ice Stupa.
// They illuminate upward subtly at night, like architectural lighting.
const facadeLights = [];
const facadeFixtures = [];

const facadeLightPositions = [
    [-3.15, 0.20,  2.35],
    [ 3.15, 0.20,  2.35],
    [ 0.00, 0.20, -3.35]
];

// One shared lightweight floodlight geometry/material set.
const fixtureBodyGeometry = new THREE.BoxGeometry(0.48, 0.34, 0.22);
const fixtureBodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x4b5157,
    roughness: 0.82,
    metalness: 0.35,
    flatShading: true
});

const fixtureFaceGeometry = new THREE.BoxGeometry(0.34, 0.23, 0.012);
const fixtureFaceMaterial = new THREE.MeshStandardMaterial({
    color: 0x30363b,
    emissive: 0xffd9a0,
    emissiveIntensity: 0.0,
    roughness: 0.5,
    metalness: 0.05
});

const fixtureBracketGeometry = new THREE.BoxGeometry(0.10, 0.42, 0.10);
const fixtureBracketMaterial = new THREE.MeshStandardMaterial({
    color: 0x3e444a,
    roughness: 0.9,
    metalness: 0.3,
    flatShading: true
});

for (const [x, y, z] of facadeLightPositions) {
    // Physical floodlight housing, inspired by the supplied facade-light reference.
    const fixture = new THREE.Group();

    const body = new THREE.Mesh(fixtureBodyGeometry, fixtureBodyMaterial);
    const face = new THREE.Mesh(fixtureFaceGeometry, fixtureFaceMaterial);
    const bracket = new THREE.Mesh(fixtureBracketGeometry, fixtureBracketMaterial);

    face.position.z = 0.116;
    bracket.position.y = -0.35;

    fixture.add(body, face, bracket);
    fixture.position.set(x, y + 0.42, z);

    // Aim the rectangular lamp toward the centre of the stupa.
    const target = new THREE.Vector3(0, 3.3, 0);
    fixture.lookAt(target);
    fixture.rotateX(-0.10);

    scene.add(fixture);
    facadeFixtures.push({ fixture, face });

    const light = new THREE.SpotLight(
        0xffe3b8,       // warm architectural light
        0.0,
        11,
        Math.PI / 5.8,
        0.78,
        1.4
    );

    light.position.set(x, y + 0.42, z);
    light.target.position.set(0, 3.5, 0);

    scene.add(light);
    scene.add(light.target);
    facadeLights.push(light);
}


/* ---------- GROUND ---------- */

const ground = new THREE.Mesh(
    new THREE.CircleGeometry(38, 32),
    new THREE.MeshStandardMaterial({
        color: 0xc9d3dc,
        roughness: 0.96,
        metalness: 0
    })
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.08;
scene.add(ground);

/* ---------- LOW-POLY MOUNTAINS ---------- */

function mountain(x, z, scale, height, color) {
    const geo = new THREE.ConeGeometry(
        scale,
        height,
        5,
        1
    );

    const mat = new THREE.MeshStandardMaterial({
        color,
        flatShading: true,
        roughness: 1
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, height / 2 - 0.1, z);
    mesh.rotation.y = Math.random() * Math.PI;
    scene.add(mesh);

    return mesh;
}

mountain(-15, -17, 9, 15, 0x627487);
mountain(-5, -20, 8, 18, 0x73869a);
mountain(7, -21, 10, 21, 0x536679);
mountain(17, -18, 9, 16, 0x687b8d);

mountain(-20, -10, 7, 11, 0x8293a3);
mountain(21, -8, 7, 13, 0x718395);

/* ---------- ICE STUPA ---------- */

function createIceStupa() {
    const group = new THREE.Group();

    /*
      LOW-POLY ICE STUPA — based on the supplied reference.

      The reference is not a clean mathematical cone. It is a mountain-like
      mass made from accumulated ice: broad at the bottom, irregular and
      lumpy through the middle, then narrowing into a small ice core/spire.

      We keep the underlying form solid, then add a controlled number of
      low-poly ice formations over it. Everything uses simple shared
      geometries so the scene remains lightweight.
    */

    const bodyHeight = 8.6;

    // Solid underlying mass. The uneven profile gives the silhouette
    // the broad, naturally accumulated character of the reference.
    const profile = [
        new THREE.Vector2(0.00, 0.00),
        new THREE.Vector2(3.55, 0.00),
        new THREE.Vector2(4.05, 0.32),
        new THREE.Vector2(4.28, 0.72),
        new THREE.Vector2(4.20, 1.20),
        new THREE.Vector2(4.05, 1.75),
        new THREE.Vector2(3.88, 2.35),
        new THREE.Vector2(3.60, 2.95),
        new THREE.Vector2(3.35, 3.55),
        new THREE.Vector2(3.05, 4.20),
        new THREE.Vector2(2.72, 4.85),
        new THREE.Vector2(2.38, 5.45),
        new THREE.Vector2(2.02, 6.05),
        new THREE.Vector2(1.68, 6.60),
        new THREE.Vector2(1.35, 7.10),
        new THREE.Vector2(1.02, 7.55),
        new THREE.Vector2(0.72, 7.95),
        new THREE.Vector2(0.42, 8.30),
        new THREE.Vector2(0.18, 8.52),
        new THREE.Vector2(0.00, bodyHeight)
    ];

    const geometry = new THREE.LatheGeometry(profile, 12, 0, Math.PI * 2);

    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0xdcecf2,
        roughness: 0.94,
        metalness: 0.0,
        flatShading: true,
        side: THREE.DoubleSide
    });

    group.add(new THREE.Mesh(geometry, bodyMaterial));

    /*
      Accumulated ice formations.
      Low-poly icosahedra are used as shared "ice masses". They overlap the
      solid body, producing the chunky frozen texture seen in the reference
      without using thousands of polygons.
    */
    const lumpGeometry = new THREE.IcosahedronGeometry(1, 0);
    const lumpMaterial = new THREE.MeshStandardMaterial({
        color: 0xe7f5f8,
        roughness: 0.88,
        flatShading: true,
        side: THREE.DoubleSide
    });

    // Deterministic random generator — same model every time.
    let seed = 9173;
    function rnd() {
        seed = (seed * 1664525 + 1013904223) >>> 0;
        return seed / 4294967296;
    }

    function bodyRadiusAt(y) {
        const t = Math.max(0, Math.min(1, y / bodyHeight));
        return 4.28 * Math.pow(1 - t, 0.60);
    }

    // Larger formations low down, progressively smaller toward the top.
    const levels = [
        { y: 0.65, count: 12, size: 0.62 },
        { y: 1.25, count: 13, size: 0.56 },
        { y: 1.95, count: 12, size: 0.52 },
        { y: 2.65, count: 11, size: 0.47 },
        { y: 3.40, count: 10, size: 0.42 },
        { y: 4.15, count: 9,  size: 0.38 },
        { y: 4.90, count: 8,  size: 0.34 },
        { y: 5.65, count: 7,  size: 0.30 },
        { y: 6.35, count: 6,  size: 0.27 },
        { y: 7.05, count: 5,  size: 0.23 },
        { y: 7.35, count: 4,  size: 0.20 }
    ];

    for (const level of levels) {
        // Offset every other level so formations don't line up into rings.
        const phase = (level.y % 1.4) * 1.7;

        for (let i = 0; i < level.count; i++) {
            const angle =
                (i / level.count) * Math.PI * 2 +
                phase +
                (rnd() - 0.5) * 0.38;

            const baseR = bodyRadiusAt(level.y);
            const radialOffset = (rnd() - 0.5) * 0.65;
            const r = Math.max(0.25, baseR + radialOffset);

            const scale = level.size * (0.72 + rnd() * 0.55);

            const lump = new THREE.Mesh(lumpGeometry, lumpMaterial);

            lump.position.set(
                Math.cos(angle) * r,
                level.y + (rnd() - 0.5) * 0.30,
                Math.sin(angle) * r
            );

            // Elongate some masses vertically like frozen accumulation.
            lump.scale.set(
                scale * (0.75 + rnd() * 0.45),
                scale * (0.90 + rnd() * 0.85),
                scale * (0.75 + rnd() * 0.45)
            );

            lump.rotation.set(
                rnd() * Math.PI,
                rnd() * Math.PI,
                rnd() * Math.PI
            );

            group.add(lump);
        }
    }

    /*
      A small number of hanging icicles break up the otherwise rounded lumps.
      They are deliberately sparse — the reference has irregular vertical
      frozen growth, not a forest of spikes.
    */
    const icicleGeometry = new THREE.ConeGeometry(0.13, 1.0, 5, 1, false);
    const icicleMaterial = new THREE.MeshStandardMaterial({
        color: 0xdff1f5,
        roughness: 0.91,
        flatShading: true,
        side: THREE.DoubleSide
    });

    for (let i = 0; i < 18; i++) {
        const y = 1.0 + rnd() * 5.8;
        const angle = rnd() * Math.PI * 2;
        const r = Math.max(0.3, bodyRadiusAt(y) + 0.12);

        const h = 0.45 + rnd() * 0.95;
        const icicle = new THREE.Mesh(icicleGeometry, icicleMaterial);

        icicle.position.set(
            Math.cos(angle) * r,
            y - h * 0.22,
            Math.sin(angle) * r
        );

        icicle.scale.set(
            0.65 + rnd() * 1.2,
            h,
            0.65 + rnd() * 1.2
        );

        // Point down.
        icicle.rotation.x = Math.PI;
        group.add(icicle);
    }

    /*
      Central ice column from the reference. This is part of the stupa's
      structure, not a decorative "cap".
    */
    

    // Small frozen buildup where the column grows out of the main mass.

    return group;
}

const stupa = createIceStupa();
scene.add(stupa);

/* ---------- SMALL ICE FIELD ---------- */



/* ---------- SIMPLE ATMOSPHERE ---------- */

const sky = new THREE.Mesh(
    new THREE.SphereGeometry(120, 16, 8),
    new THREE.MeshBasicMaterial({
        color: 0x102a43,
        side: THREE.BackSide
    })
);
scene.add(sky);

/* ---------- SUN ---------- */

const sunMesh = new THREE.Mesh(
    new THREE.SphereGeometry(1.15, 16, 10),
    new THREE.MeshBasicMaterial({ color: 0xffc928 })
);
sunMesh.position.set(-18, 22, -30);
scene.add(sunMesh);

// Lightweight moon for the night half of the cycle.
const moonMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.82, 16, 10),
    new THREE.MeshBasicMaterial({ color: 0xf2f0dc })
);
moonMesh.position.set(18, -22, -30);
scene.add(moonMesh);

// Lightweight star field — visible only at night.
const starGeometry = new THREE.BufferGeometry();
const starPositions = [];
let starSeed = 4217;
function starRnd() {
    starSeed = (starSeed * 1664525 + 1013904223) >>> 0;
    return starSeed / 4294967296;
}
for (let i = 0; i < 90; i++) {
    const a = starRnd() * Math.PI * 2;
    const r = 24 + starRnd() * 14;
    const y = 7 + starRnd() * 18;
    starPositions.push(Math.cos(a) * r, y, Math.sin(a) * r - 15);
}
starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starPositions, 3)
);
const stars = new THREE.Points(
    starGeometry,
    new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.10,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.0
    })
);
scene.add(stars);

/* ---------- ANIMATION ---------- */

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const t = clock.getElapsedTime();

    /*
      DAY / NIGHT TRANSITION
      One complete cycle = 60 seconds.
      The environment, sun, moon, sky, fog and illumination all transition
      together. The stupa geometry never changes.
    */
    const cycle = 60.0;
    const phase = (t % cycle) / cycle;
    const angle = phase * Math.PI * 2;

    // 0 = midnight, PI = midday.
    const daylight = Math.max(0, Math.sin(angle));

    // Smooth the sunrise/sunset transition.
    const dayBlend = daylight * daylight * (3.0 - 2.0 * daylight);

    // Four visually distinct atmospheric states:
    // deep night -> sunrise -> daytime -> sunset -> deep night.
    const nightSky = new THREE.Color(0x030814);
    const dawnSky = new THREE.Color(0xf0a36a);
    const daySky = new THREE.Color(0x8fc8ed);
    const sunsetSky = new THREE.Color(0xd86f55);

    const nightFog = new THREE.Color(0x07101b);
    const dawnFog = new THREE.Color(0xbca8a0);
    const dayFog = new THREE.Color(0xb9d2df);

    // Solar elevation: -1 = midnight, 0 = horizon, +1 = noon.
    const solarElevation = Math.sin(angle);

    let sky;
    let fog;

    if (solarElevation < -0.18) {
        // Deep night.
        sky = nightSky.clone();
        fog = nightFog.clone();
    } else if (solarElevation < 0.18) {
        // Sunrise / sunset band.
        const h = THREE.MathUtils.clamp((solarElevation + 0.18) / 0.36, 0, 1);
        const warm = angle < Math.PI ? dawnSky : sunsetSky;
        sky = nightSky.clone().lerp(warm, h);
        fog = nightFog.clone().lerp(dawnFog, h);
    } else {
        // Daytime.
        const h = THREE.MathUtils.clamp((solarElevation - 0.18) / 0.82, 0, 1);
        const warm = angle < Math.PI ? dawnSky : sunsetSky;
        sky = warm.clone().lerp(daySky, h);
        fog = dawnFog.clone().lerp(dayFog, h);
    }

    scene.background.copy(sky);
    scene.fog.color.copy(fog);

    // Sun follows a simple arc across the sky.
    const sunAngle = phase * Math.PI * 2;
    sunMesh.position.set(
        Math.cos(sunAngle) * 22,
        Math.sin(sunAngle) * 22,
        -30
    );

    // Moon follows the opposite arc.
    moonMesh.position.set(
        -Math.cos(sunAngle) * 20,
        -Math.sin(sunAngle) * 20,
        -28
    );

    // The sun becomes a strong golden disk around sunrise/sunset
    // and a bright yellow-white disk during the day.
    const horizon = THREE.MathUtils.clamp(
        (solarElevation + 0.12) / 0.24, 0, 1
    );

    sunMesh.visible = solarElevation > -0.08;
    moonMesh.visible = solarElevation < 0.08;

    const sunColor = solarElevation < 0.22
        ? new THREE.Color(0xff8a3d)
        : new THREE.Color(0xffd43b);

    sunMesh.material.color.copy(sunColor);

    // Strong golden point light around the horizon; brighter white/yellow
    // sunlight at midday.
    sun.color.copy(
        solarElevation < 0.22
            ? new THREE.Color(0xff9a52)
            : new THREE.Color(0xfff2c4)
    );
    sun.intensity = 0.03 + dayBlend * 3.55;

    hemi.color.copy(
        nightSky.clone().lerp(
            new THREE.Color(0xbddcff),
            dayBlend
        )
    );
    hemi.groundColor.copy(
        new THREE.Color(0x101a29).lerp(
            new THREE.Color(0x687b82),
            dayBlend
        )
    );
    hemi.intensity = 0.12 + dayBlend * 1.65;

    // Moonlight and stars make the night visually read as night.
    moonLight.intensity = 0.03 + (1.0 - dayBlend) * 0.22;
    stars.material.opacity = Math.pow(1.0 - dayBlend, 1.6) * 0.9;

    // Subtle facade lighting: nearly invisible during twilight/day,
    // gradually coming on as the scene reaches deep night.
    const deepNight = THREE.MathUtils.clamp(
        (0.15 - solarElevation) / 0.55,
        0,
        1
    );

    for (const light of facadeLights) {
        // Subtle architectural wash — enough to reveal the ice, never a floodlight.
        light.intensity = deepNight * 0.58;
    }

    for (const { face } of facadeFixtures) {
        // The physical lamp face itself glows softly only when switched on.
        face.material.emissiveIntensity = deepNight * 1.6;
    }

    // ---------------------------------------------------------------
    // ENVIRONMENTAL CONDITION SIMULATION
    // The displayed values follow the same day/night cycle.
    // Values are intentionally smooth so the panel feels like live data.
    // ---------------------------------------------------------------
    const night = 1.0 - dayBlend;

    // Temperature: colder at night, warmer during daylight.
    const temperature = -17.0 + dayBlend * 9.5;

    // Relative humidity rises during the colder night period.
    const humidity = 82.0 - dayBlend * 25.0;

    // Wind varies gently through the simulated 24-hour cycle.
    const wind = 2.0 + 1.7 * (0.5 + 0.5 * Math.sin(angle * 1.7 + 1.2));

    // Water temperature follows air temperature, but changes more slowly.
    const waterTemp = -0.8 + dayBlend * 2.2;

    // Simple ice-formation feasibility indicator:
    // colder air + higher humidity + low water temperature = better.
    const coldScore = THREE.MathUtils.clamp((-temperature - 1.0) / 17.0, 0, 1);
    const humidityScore = THREE.MathUtils.clamp((humidity - 45.0) / 40.0, 0, 1);
    const waterScore = THREE.MathUtils.clamp((1.5 - waterTemp) / 3.0, 0, 1);

    const feasibility =
        THREE.MathUtils.clamp(
            100 * (0.50 * coldScore + 0.30 * humidityScore + 0.20 * waterScore),
            0, 100
        );

    const directions = ["NW", "N", "NE", "E", "SE", "S", "SW", "W"];
    const directionIndex = Math.floor(((phase + 0.06) * directions.length)) % directions.length;
    const windDirection = directions[directionIndex];

    document.getElementById("tempValue").textContent =
        `${temperature.toFixed(1)} °C`;

    document.getElementById("humidityValue").textContent =
        `${humidity.toFixed(0)} %`;

    document.getElementById("windValue").textContent =
        `${wind.toFixed(1)} m/s`;

    document.getElementById("windDirValue").textContent =
        windDirection;

    document.getElementById("waterTempValue").textContent =
        `${waterTemp.toFixed(1)} °C`;

    document.getElementById("feasibilityValue").textContent =
        `${feasibility.toFixed(0)} %`;

    const statusText = document.getElementById("statusText");

    if (feasibility >= 75) {
        statusText.textContent = "Conditions favourable";
    } else if (feasibility >= 45) {
        statusText.textContent = "Marginal conditions";
    } else {
        statusText.textContent = "Conditions unfavourable";
    }

    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    renderer.setSize(innerWidth, innerHeight);
});

document.getElementById("loading").remove();

animate();

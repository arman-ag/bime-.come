/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        base_url: "https://front-end-task.bmbzr.ir",

    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
};

export default nextConfig;

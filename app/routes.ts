import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("pricing", "./routes/pricing.tsx"),
    route("community", "./routes/community.tsx"),
    route("enterprise", "./routes/enterprise.tsx"),
    route(".well-known/appspecific/com.chrome.devtools.json", "./routes/chrome-devtools-probe.ts"),
    route("api/generate-render", "./routes/api.generate-render.ts"),
    route("api/projects/save", "./routes/api.projects.save.ts"),
    route("api/projects/list", "./routes/api.projects.list.ts"),
    route("api/projects/get", "./routes/api.projects.get.ts"),
    route('visualizer/:id', './routes/visualizer.$id.tsx')
] satisfies RouteConfig;

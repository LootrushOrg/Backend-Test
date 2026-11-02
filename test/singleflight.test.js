import { createSingleflight } from "../src/singleflight.js";
import { registerSingleflightTests } from "./cases.js";

registerSingleflightTests(createSingleflight);

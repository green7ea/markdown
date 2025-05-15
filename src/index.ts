import { serve } from "./serve.ts";

const [filename] = Deno.args;

serve(filename, 1337);

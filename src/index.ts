import { logTime } from "./utils/logTime";

const batchTime = logTime()
for (let index = 0; index < 10000000; index++) {
}
console.log(`Done in ${batchTime()}`)
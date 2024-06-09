import Queue from "../classes/queue.js"
import { MAX_SIZE, ID } from "../utils/config.js";
import OBR from "@owlbear-rodeo/sdk";
import { ref } from "vue";

const resultLog = ref(new Queue(MAX_SIZE));
const setupLogCommunication = () => {
  const channel = `${ID}/log`;
  OBR.broadcast.onMessage(channel, (message) => {
    const result = message.data;
    const command = result.command;
    if (command === "clear") {
      resultLog.value.clear();
      return;
    }
    resultLog.value.enqueue(result);
  });
}

export { resultLog, setupLogCommunication };
const Docker = require("dockerode");
const docker = new Docker();

exports.executeCode = async (code, testCases) => {
  try {
    const container = await docker.createContainer({
      Image: "node:latest",  // Ensure Node.js image is used
      Cmd: ["node", "-e", code],
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
    });

    await container.start();
    const output = await container.logs({ follow: true, stdout: true, stderr: true });
    await container.stop();
    await container.remove();
    
    return output.toString();
  } catch (error) {
    throw new Error(`Docker execution failed: ${error.message}`);
  }
};

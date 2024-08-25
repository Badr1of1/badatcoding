const Docker = require("dockerode");
const docker = new Docker();

exports.executeCode = async (code, language, testCases) => {
  const container = await docker.createContainer({
    Image: `code-execution-${language}`,
    Cmd: ["node", "-e", code],
    AttachStdin: false,
    AttachStdout: true,
    AttachStderr: true,
  });

  await container.start();

  const output = await container.logs({
    follow: true,
    stdout: true,
    stderr: true,
  });

  await container.stop();
  await container.remove();

  return output.toString();
};

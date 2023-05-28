const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

type Commands = "zrange" | "sismember" | "get" | "smembers";

export async function fetchRedis(
  command: Commands,
  ...args: (string | number)[]
) {
  const commandUrl = `${upstashUrl}/${command}/${args.join("/")}`;

  const restResponse = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${upstashToken}`,
    },
    cache: "no-store",
  });

  if (!restResponse.ok) {
    throw new Error("Error executing Redis command" + restResponse.statusText);
  }

  const data = await restResponse.json();
  return data.result;
}

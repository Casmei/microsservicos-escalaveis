import "@opentelemetry/auto-instrumentations-node/register"
import { trace } from "@opentelemetry/api"
import { fastify } from "fastify";
import { setTimeout } from "node:timers/promises";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../database/client.ts";
import { schema } from "../database/schema/index.ts";
import { randomUUID } from "node:crypto";
import { dispatchOrderCreated } from "../broker/messages/order-created.ts";
import { tracer } from "../tracer/tracer.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", () => {
	return "OK";
});

app.post(
	"/orders",
	{
		schema: {
			body: z.object({
				amount: z.number(),
			}),
		},
	},
	async (req, reply) => {
		const { amount } = req.body;
		const orderId = randomUUID();

		dispatchOrderCreated({
			orderId,
			amount,
			customer: {
				id: "a4945622-7907-4db9-b607-31cebcf8c167"
			}
		})

		await db.insert(schema.orders).values({
			id: orderId,
			customerId: "a4945622-7907-4db9-b607-31cebcf8c167",
			amount
		})

		const span = tracer.startSpan('Eu acho que aqui tá dando merda')
		span.setAttribute('test', 'Olá mundo');

		await setTimeout(2000)
		span.end()
		trace.getActiveSpan()?.setAttribute('order_id', orderId)

		return reply.status(201).send();
	},
);

app.listen({ host: "0.0.0.0", port: 3333 }).then(() => {
	console.log("[Orders] Server is running!");
});

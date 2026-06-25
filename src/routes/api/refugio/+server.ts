import { json } from '@sveltejs/kit';
import { KMSClient, DecryptCommand } from '@aws-sdk/client-kms';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

function getKmsClient() {
	return new KMSClient({
		region: env.AWS_REGION ?? 'us-east-2',
		credentials: {
			accessKeyId: env.AWS_ACCESS_KEY_ID!,
			secretAccessKey: env.AWS_SECRET_ACCESS_KEY!
		}
	});
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		// 1. Validar Authorization header
		const authHeader = request.headers.get('Authorization');
		if (!authHeader?.startsWith('Bearer ')) {
			return json({ error: 'No autorizado' }, { status: 401 });
		}

		// 2. Recibir payload cifrado
		const body = await request.json();
		if (!body.data) {
			return json({ error: 'Payload vacío' }, { status: 400 });
		}

		// 3. Descifrar con AWS KMS
		const encryptedBytes = Buffer.from(body.data, 'base64');
		const decryptCommand = new DecryptCommand({
			CiphertextBlob: encryptedBytes,
			KeyId: env.AWS_KMS_KEY_ID!
		});

		const kmsClient = getKmsClient();
		const decryptResult = await kmsClient.send(decryptCommand);
		const decryptedText = Buffer.from(decryptResult.Plaintext!).toString('utf-8');
		const decryptedData = JSON.parse(decryptedText);

		console.log('Datos recibidos desde RefugioHuellas:', decryptedData);

		return json({
			success: true,
			mensaje: 'Datos recibidos y descifrados correctamente',
			datos: decryptedData
		});
	} catch (error) {
		console.error('Error en /api/refugio:', error);
		return json({ error: 'Error interno del servidor' }, { status: 500 });
	}
};

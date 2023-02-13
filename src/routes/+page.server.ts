import { env } from '$env/dynamic/private';
export const actions = {
	fetchRequests: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		const album = formData.album;
		const artist = formData.artist;
		const requestId = formData.requestId;

		if (!album || !artist || !requestId) {
			return {
				status: 400,
				error: 'Missing required fields'
			};
		}


		// Make external API call
		try {
			const response = await fetch(env.PATTERNS_WEBHOOK, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					album,
					artist,
					requestId
				})
			});
			const data = await response.json();

			if (data.error) {
				throw new Error(data.message);
			}
		} catch (error) {
			return {
				status: 500,
				error: error.message
			};
		}

		return {
			success: true,
			data: {
				requestId,
				album,
				artist
			}
		};
	}
};

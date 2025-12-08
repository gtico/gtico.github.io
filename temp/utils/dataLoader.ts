export async function loadData(targetUrl: string) {
    const proxies = [
        (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`
    ];

    let data = null;
    let lastError = null;

    for (const proxyBuilder of proxies) {
        const proxyUrl = proxyBuilder(targetUrl);
        // console.log(`🔄 Loading via: ${proxyUrl}`);
        try {
            const response = await fetch(proxyUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            data = await response.json();
            if (Array.isArray(data)) break;
        } catch (error) {
            console.warn(`⚠️ Proxy error ${proxyUrl}:`, error);
            lastError = error;
        }
    }

    if (!data) {
        throw lastError || new Error("Failed to load data");
    }
    return data;
}
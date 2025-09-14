const url = process.env.API_URL

exports.sendEmail = async data => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${process.env.API_KEY}`
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Internal server error")
        }
        return await response.json();
    } catch (error) {
        throw new Error();
    }
}
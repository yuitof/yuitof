const url = process.env.API_URL

exports.sendEmail = async data => {
    try {
        const result = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${process.env.API_KEY}`
            },
            body: JSON.stringify(data),
        });
        return result;
    } catch (error) {
        return error;
    }
}
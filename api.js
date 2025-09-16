const url = process.env.API_URL
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

exports.sendEmail = async data => {
    try {
        if (!emailRegex.test(data.email)) {
            throw new Error("Invalid email address");
        }

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
        console.error(error)
        throw new Error();
    }
}
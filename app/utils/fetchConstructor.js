
const customGetter = async (requestPath) => {
    const resJson = await fetch(requestPath, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const resData = await resJson.json();
    return resData;
};

const customPoster = async (requestPath, requestBody) => {
    const resJson = await fetch(requestPath, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });
    const resData = resJson.json();
    return resData;
}

export { customGetter, customPoster };


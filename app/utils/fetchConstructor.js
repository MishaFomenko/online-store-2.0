
const customGetter = async (requestPath) => {
    const resJson = await fetch(requestPath, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const resData = await resJson.json();
    return resData;
}

export { customGetter };
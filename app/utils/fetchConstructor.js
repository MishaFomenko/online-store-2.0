
const customGetter = async (relativePath, action, collection = null, document = null, category = null, keyword = null) => {
    const resJson = await fetch(`${relativePath}?action=${action}&collection=${collection}&document=${document}&category=${category}&kw=${keyword}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const resData = await resJson.json();
    return resData;
}

export { customGetter };
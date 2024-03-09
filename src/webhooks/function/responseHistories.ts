export function responseHistory(idHistory: string, text: string,palabraClave?: string[], idHis?: string): object {
    if (idHis === undefined || idHis === "") {
        return respondToAllStories(palabraClave, text.toLowerCase(), { text: "responder historias" });
    } else {
        return respondToSpecificStory(idHistory, idHis, palabraClave, text);
    }
}

function respondToAllStories(palabraClave: string[] | undefined, text: string | undefined, response: object): object {
    if (palabraClave && palabraClave.includes(text)) {
        return response;
    } else if (!palabraClave || palabraClave.length === 0) {
        return response;
    }else {
        return {};
    }
}

function respondToSpecificStory(idHistory: string, idHis: string, palabraClave: string[] | undefined, text: string | undefined): object {
    if (idHistory === idHis) {
        return respondToAllStories(palabraClave, text, { text: "responder historia por id" });
    } 
}

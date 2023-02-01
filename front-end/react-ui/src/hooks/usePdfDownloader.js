import useAxiosPrivate from "./useAxiosPrivate";

const usePdfDownloader = () => {
    const axiosPrivate = useAxiosPrivate();

    // const dateNow = new Date().toISOString().split("T")[0];

    const loadPdfFile = async (url) => {
        // Its important to set the 'Content-Type': 'blob' and responseType:'arraybuffer'.
        const headers = { "Content-Type": "blob" };
        const config = {
            method: "GET",
            url: url,
            responseType: "arraybuffer",
            headers,
        };

        try {
            const response = await axiosPrivate(config);

            const outputFilename = `Manual.pdf`;

            const url = URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", outputFilename);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            throw Error(error);
        }
    };

    return { loadPdfFile };
};

export default usePdfDownloader;

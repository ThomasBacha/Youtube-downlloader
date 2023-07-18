import { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core";

const downloadVideo = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { url } = req.body;

        if (!ytdl.validateURL(url)) {
            res.status(400).send('Invalid URL');
            return;
        }

        const info = await ytdl.getInfo(url);

        const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
        if (format) {
            res.setHeader('Content-Disposition', `attachment; filename=${info.videoDetails.title}.mp4`);
            ytdl(url, { format: format }).pipe(res);
        } else {
            res.status(400).send('No available formats found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

export default downloadVideo;

export default interface spotifyEpisode {
    id: string;
    title: string;
    description: string;
    preview_url : string;
    url: string;
    imageUrl: string;
    tags:string[] | []
    [x: string] : any;
}
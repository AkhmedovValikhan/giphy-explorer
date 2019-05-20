export interface GiphyEndpointResult {
    data: GiphyResultEntry[];
    pagination: Pagination;
    meta: Meta;
}

export interface GiphyResultEntry {
    type: string;
    id: string;
    slug: string;
    url: string;
    bitly_gif_url: string;
    bitly_url: string;
    embed_url: string;
    username: string;
    source: string;
    rating: string;
    content_url: string;
    source_tld: string;
    source_post_url: string;
    is_sticker: number;
    import_datetime: Date;
    trending_datetime: string;
    images: Images;
    title: string;
    analytics: Analytics;
}

export interface Analytics {
    onload: Onclick;
    onclick: Onclick;
    onsent: Onclick;
}

export interface Onclick {
    url: string;
}

export interface Images {
    fixed_height_still: The480WStill;
    original_still: The480WStill;
    fixed_width: FixedHeight;
    fixed_height_small_still: The480WStill;
    fixed_height_downsampled: FixedHeight;
    preview: DownsizedSmall;
    fixed_height_small: FixedHeight;
    downsized_still: The480WStill;
    downsized: The480WStill;
    downsized_large: The480WStill;
    fixed_width_small_still: The480WStill;
    preview_webp: The480WStill;
    fixed_width_still: The480WStill;
    fixed_width_small: FixedHeight;
    downsized_small: DownsizedSmall;
    fixed_width_downsampled: FixedHeight;
    downsized_medium: The480WStill;
    original: FixedHeight;
    fixed_height: FixedHeight;
    looping: Looping;
    original_mp4: DownsizedSmall;
    preview_gif: The480WStill;
    '480w_still': The480WStill;
    hd?: DownsizedSmall;
}

export interface The480WStill {
    url: string;
    width: string;
    height: string;
    size?: string;
}

export interface DownsizedSmall {
    width: string;
    height: string;
    mp4: string;
    mp4_size: string;
}

export interface FixedHeight {
    url: string;
    width: string;
    height: string;
    size: string;
    mp4?: string;
    mp4_size?: string;
    webp: string;
    webp_size: string;
    frames?: string;
    hash?: string;
}

export interface Looping {
    mp4: string;
    mp4_size: string;
}

export interface Meta {
    status: number;
    msg: string;
    response_id: string;
}

export interface Pagination {
    total_count: number;
    count: number;
    offset: number;
}

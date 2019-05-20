// import * as React from 'react';
// import { RouteComponentProps } from 'react-router';
// import { Inject } from '../../injector/injector';
// import { GiphyResultEntry } from '../../model/giphy';
// import { GiphyClient } from '../../services/GiphyService';
// import { GifsList } from '../articles/GiphyList';
// import './HomePage.scss';

// export type HomeProps = Pick<RouteComponentProps, 'history'> & {
//     selectedCategory: string | undefined;
// };

// export interface HomeState {
//     gifs: GiphyResultEntry[];
// }

// export class HomePage extends React.PureComponent<HomeProps, HomeState> {
//     @Inject() private _giphyClient: GiphyClient;

//     constructor(props: HomeProps) {
//         super(props);

//         this.state = {
//             gifs: [],
//         };
//     }

//     public async componentDidMount() {
//         // If category is selected we need to add all sources to query, so we await it.
//         this.fetchArticles();
//     }

//     public componentDidUpdate(prevProps: HomeProps) {
//         if (prevProps.selectedCategory !== this.props.selectedCategory) {
//             this.fetchArticles();
//         }
//     }

//     private fetchArticles = async (page: number = 0) => {
//         let gifs = await this._giphyClient.trending(page);
//         gifs = this.state.gifs.concat(gifs);
//         this.setState({ gifs });
//     }

//     public render() {
//         return (
//         <div className='container'>
//             <div className='module'>
//                 <GifsList fetchMore={this.fetchArticles} gifs={this.state.gifs} />
//             </div>
//         </div >
//         );
//     }
// }

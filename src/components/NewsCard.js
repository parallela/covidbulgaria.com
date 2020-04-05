import React from "react";

export default class NewsCard extends React.Component {
    render() {
        return (
            <div className="card mt-4 mb-2">
                <div className="card-body">
                    <h2>Новини от VESTI.BG</h2>
                    <iframe title={'rssfeed'} width={'100%'} height={'250vh'} src={'https://rss.covidbulgaria.com/'} key={'i1'}></iframe>
                </div>
            </div>
        );
    }
}
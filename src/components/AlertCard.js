import React from "react";


export default class AlertCard extends React.Component {
    render() {
        return (
            <div className="card mt-4 mb-2">
                <div className="card-body">
                    <h2>#ОСТАНИВКЪЩИ</h2>

                    <h5>Още източници на информация: </h5>
                    <p>
                        <a href={'https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports'}>Дневен
                            доклад на СЗО</a>
                        <br/>
                        <a href={'https://www.mh.government.bg/bg/'}>Министерство на здравеопазването</a>
                    </p>


                    <small>Creators: Lubomir Stankov, Peter Petrov, Yordan Cvetomirov</small><br />
                    <small>Data source: <a href={'https://github.com/COVID-19-Bulgaria/virus-tracker'}>COVID19-Bulgaria</a></small><br />
                    <small>Source code: <a href={'https://github.com/parallela/covidbulgaria.com'}>Github</a></small><br />
                    <small style={{color: 'red'}}>Този уебсайт не е официален източник на информация. Информацията публикувана тук е с изследователски тракер предоставен от <a href={'https://github.com/COVID-19-Bulgaria/virus-tracker'}>COVID19-Bulgaria</a></small>
                </div>
            </div>
        );
    }
}
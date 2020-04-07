export const setTitle = async () => {
    var title = []
    await fetch('https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/TotalsDataset.json', {
        method: 'GET',
    }).then(res => res.json()).then((result) => {
        title = "COVID-19 Bulgarian Stats | Infected: " + result.infected + " / Cured: " + result.cured;
    });

    return document.title = title;
}

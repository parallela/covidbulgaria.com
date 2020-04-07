export const setTitle = async () => {
    var title = []
    await fetch('https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/TotalsDataset.json', {
        method: 'GET',
    }).then(res => res.json()).then((result) => {
        title = "COVID-19 Българска Статистика | Заразени: " + result.infected + " / Излекувани: " + result.cured;
    });

    return document.title = title;
}

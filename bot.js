const Discord = require('discord.js');
const fs = require('fs');
const axios = require('axios');
const plotly = require('plotly')("PLOTLY_USERNAME", "PLOTLY_API_KEY");
const downloader = require('image-downloader');

const client = new Discord.Client();
const auth = require('./auth.json');

const help = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('API Information')
    .setURL('https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest#9739c95f-ef1d-489b-97a9-0a6dfe2f74d8')
    .setAuthor('Covid-19 Bot', 'https://cdn.discordapp.com/avatars/690299652389601530/02e17491d89149ea8d01c57038d73980.png?size=256', 'https://www.postman.com/')
    .setDescription('This bot utilizes getpostman API which is linked in this message')
    .addFields(
        { name: 'Usage', value: 'You can use the commands displayed below to get specefic information about covid-19 cases. In addtion, this bot is a spam bot. Everytime Sarah sends a message, there is a chance that she will get spammed.' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Ontario total cases', value: '$ontario', inline: true },
        { name: 'info for Canada', value: '$canada', inline: true },
        { name: 'info for China', value: '$china', inline: true },
        { name: 'info for The U.S.', value: '$usa', inline: true },
        { name: 'info for S. Korea', value: '$korea', inline: true },
        { name: 'info for Japan', value: '$japan', inline: true },
        { name: 'info for the UK', value: '$uk', inline: true },
        { name: 'info for Germany', value: '$germany', inline: true },
        { name: 'ifno for France', value: '$france', inline: true },
        { name: 'info for Italy', value: '$italy', inline: true },
        { name: 'info for Iran', value: '$iran', inline: true },
        { name: 'info for Russia', value: '$russia', inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: 'compare scatters', value: '$scatter-all', inline: true },
        { name: 'scatter for Canada', value: '$scatter-canada', inline: true },
        { name: 'scatter for The U.S.', value: '$scatter-us', inline: true },
        { name: 'scatter for Japan', value: '$scatter-japan', inline: true },
        { name: 'scatter for Germany', value: '$scatter-germany', inline: true },
        { name: 'scatter for France', value: '$scatter-france', inline: true },
        { name: 'scatter for Italy', value: '$scatter-italy', inline: true },
        { name: 'scatter for the UK', value: '$scatter-uk', inline: true },
        { name: 'scatter links', value: '$scatter-link', inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: 'Displays this message', value: '$help', inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: 'More', value: "Contact me to add more commands" },
    )
    .setTimestamp()
    .setFooter('Aryan had too much time to waste :)');

client.on('ready', () => {
    client.user.setActivity('with statistics', { type: 'PLAYING' });

    const updateNotes = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Update Notes')
        .setAuthor('Aryan', 'https://cdn.discordapp.com/avatars/406525761214742568/1f70ca4d9d0b9d062e3f2aa5912be9fd.png?size=256')
        .setDescription('Update Notes for [MONTH] [DAY], [YEAR]')
        .addFields(
            { name: '[HEADER]', value: '[BODY]' },
            { name: '\u200B', value: '\u200B' }
        )
        .setTimestamp()
        .setFooter('Update Notes');

    const channel = client.channels.cache.get('[CHANNEL_ID_FOR_UPDATE_NOTES]');
    channel.send(updateNotes);
});

client.on('message', msg => {

    if (msg.content == '$ontario') {
        Ontario(msg);
    } else if (msg.content == '$china') {
        China(msg);
    } else if (msg.content == '$canada') {
        Canada(msg);
    } else if (msg.content == '$usa') {
        USA(msg);
    } else if (msg.content == '$korea') {
        Korea(msg);
    } else if (msg.content == '$japan') {
        Japan(msg);
    } else if (msg.content == '$uk') {
        UK(msg);
    } else if (msg.content == '$germany') {
        Germany(msg);
    } else if (msg.content == '$france') {
        France(msg);
    } else if (msg.content == '$italy') {
        Italy(msg);
    } else if (msg.content == '$iran') {
        Iran(msg);
    } else if (msg.content == '$russia') {
        msg.channel.send('Srsly? You expect real numbers? Try another country');
    } else if (msg.content == '$scatter-all') {
        scatter_all(msg);
    } else if (msg.content == '$scatter-canada') {
        scatter_canada(msg);
    } else if (msg.content == '$scatter-us') {
        scatter_us(msg);
    } else if (msg.content == '$scatter-japan') {
        scatter_japan(msg);
    } else if (msg.content == '$scatter-germany') {
        scatter_germany(msg);
    } else if (msg.content == '$scatter-france') {
        scatter_france(msg);
    } else if (msg.content == '$scatter-italy') {
        scatter_italy(msg);
    } else if (msg.content == '$scatter-uk') {
        scatter_uk(msg);
    } else if (msg.content == '$scatter-link') {
        scatter_link(msg);
    } else if (msg.content == '$help') {
        msg.channel.send(help);
    }

});

function Ontario(msg) {
    axios.get('https://data.ontario.ca/api/3/action/datastore_search?resource_id=455fd63b-603d-4608-8216-7d8647f43350&limit=0')
        .then(response => {
            msg.channel.send('total number of cases reported in Ontario is: ' + response.data.result.total);
            return;
        }).catch(error => {
            console.log(error);
        });
}

function China(msg) {
    axios.get('https://api.covid19api.com/total/country/china')
        .then(response => {
            let list = response.data;
            let lastDay = response.data[list.length - 1];
            msg.channel.send('Detailed results for China thus far: \nConfirmed: ' + lastDay.Confirmed + '\nDeaths: ' + lastDay.Deaths + '\nRecovered: ' + lastDay.Recovered);
            return;
        }).catch(error => {
            console.log(error);
        });
}

function Canada(msg) {
    axios.get('https://api.covid19api.com/total/country/canada')
        .then(response => {
            let list = response.data;
            let lastDay = response.data[list.length - 1];
            msg.channel.send('Detailed results for Canada thus far: \nConfirmed: ' + lastDay.Confirmed + '\nDeaths: ' + lastDay.Deaths + '\nRecovered: ' + lastDay.Recovered);
            return;
        }).catch(error => {
            console.log(error);
        });
}

function USA(msg) {
    axios.get('https://api.covid19api.com/total/country/united-states')
        .then(response => {
            let list = response.data;
            let lastDay = response.data[list.length - 1];
            msg.channel.send('Detailed results for United States of America thus far: \nConfirmed: ' + lastDay.Confirmed + '\nDeaths: ' + lastDay.Deaths + '\nRecovered: ' + lastDay.Recovered);
            return;
        }).catch(error => {
            console.log(error);
        });
}

function Korea(msg) {
    axios.get('https://api.covid19api.com/total/country/korea-south')
        .then(response => {
            let list = response.data;
            let lastDay = response.data[list.length - 1];
            msg.channel.send('Detailed results for South Korea thus far: \nConfirmed: ' + lastDay.Confirmed + '\nDeaths: ' + lastDay.Deaths + '\nRecovered: ' + lastDay.Recovered);
            return;
        }).catch(error => {
            console.log(error);
        });
}

function Japan(msg) {
    axios.get('https://api.covid19api.com/total/country/japan')
        .then(response => {
            let list = response.data;
            let lastDay = response.data[list.length - 1];
            msg.channel.send('Detailed results for Japan thus far: \nConfirmed: ' + lastDay.Confirmed + '\nDeaths: ' + lastDay.Deaths + '\nRecovered: ' + lastDay.Recovered);
            return;
        }).catch(error => {
            console.log(error);
        });
}

function UK(msg) {
    axios.get('https://api.covid19api.com/total/country/united-kingdom')
        .then(response => {
            let list = response.data;
            let lastDay = response.data[list.length - 1];
            msg.channel.send('Detailed results for the United Kingdom thus far: \nConfirmed: ' + lastDay.Confirmed + '\nDeaths: ' + lastDay.Deaths + '\nRecovered: ' + lastDay.Recovered);
            return;
        }).catch(error => {
            console.log(error);
        });
}

function Germany(msg) {
    axios.get('https://api.covid19api.com/total/country/germany')
        .then(response => {
            let list = response.data;
            let lastDay = response.data[list.length - 1];
            msg.channel.send('Detailed results for Germany thus far: \nConfirmed: ' + lastDay.Confirmed + '\nDeaths: ' + lastDay.Deaths + '\nRecovered: ' + lastDay.Recovered);
            return;
        }).catch(error => {
            console.log(error);
        });
}

function France(msg) {
    axios.get('https://api.covid19api.com/total/country/france')
        .then(response => {
            let list = response.data;
            let lastDay = response.data[list.length - 1];
            msg.channel.send('Detailed results for France thus far: \nConfirmed: ' + lastDay.Confirmed + '\nDeaths: ' + lastDay.Deaths + '\nRecovered: ' + lastDay.Recovered);
            return;
        }).catch(error => {
            console.log(error);
        });
}

function Italy(msg) {
    axios.get('https://api.covid19api.com/total/country/italy')
        .then(response => {
            let list = response.data;
            let lastDay = response.data[list.length - 1];
            msg.channel.send('Detailed results for Italy thus far: \nConfirmed: ' + lastDay.Confirmed + '\nDeaths: ' + lastDay.Deaths + '\nRecovered: ' + lastDay.Recovered);
            return;
        }).catch(error => {
            console.log(error);
        });
}

function Iran(msg) {
    axios.get('https://api.covid19api.com/total/country/iran')
        .then(response => {
            let list = response.data;
            let lastDay = response.data[list.length - 1];
            msg.channel.send('Detailed results for Iran thus far: \nConfirmed: ' + lastDay.Confirmed + '\nDeaths: ' + lastDay.Deaths + '\nRecovered: ' + lastDay.Recovered);
            return;
        }).catch(error => {
            console.log(error);
        });
}

function canada_data(plot) {
    let cases;
    let dates;
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    axios.get('https://api.covid19api.com/total/country/canada/status/confirmed?from=2020-04-15T00:00:00Z&to=' + date + 'T00:00:00Z')
        .then(response => {
            let list = [];
            for (const result of response.data) {
                list.push(result.Cases);
            }
            cases = list;
        }).then(() => {
            const today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            axios.get('https://api.covid19api.com/total/country/canada/status/confirmed?from=2020-04-15T00:00:00Z&to=' + date + 'T00:00:00Z')
                .then(response => {
                    let list = [];
                    for (const result of response.data) {
                        list.push(result.Date);
                    }
                    dates = list;
                }).then(() => {
                    plot([cases, dates], "canada");
                })
        })
        .catch(error => {
            console.log(error);
        });
}

function usa_data(plot) {
    let cases;
    let dates;
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    axios.get('https://api.covid19api.com/total/country/united-states/status/confirmed?from=2020-04-15T00:00:00Z&to=' + date + 'T00:00:00Z')
        .then(response => {
            let list = [];
            for (const result of response.data) {
                list.push(result.Cases);
            }
            cases = list;
        }).then(() => {
            const today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            axios.get('https://api.covid19api.com/total/country/united-states/status/confirmed?from=2020-04-15T00:00:00Z&to=' + date + 'T00:00:00Z')
                .then(response => {
                    let list = [];
                    for (const result of response.data) {
                        list.push(result.Date);
                    }
                    dates = list;
                }).then(() => {
                    plot([cases, dates], "us");
                })
        })
        .catch(error => {
            console.log(error);
        });
}

function japan_data(plot) {
    let cases;
    let dates;
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    axios.get('https://api.covid19api.com/total/country/japan/status/confirmed?from=2020-04-15T00:00:00Z&to=' + date + 'T00:00:00Z')
        .then(response => {
            let list = [];
            for (const result of response.data) {
                list.push(result.Cases);
            }
            cases = list;
        }).then(() => {
            const today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            axios.get('https://api.covid19api.com/total/country/japan/status/confirmed?from=2020-04-15T00:00:00Z&to=' + date + 'T00:00:00Z')
                .then(response => {
                    let list = [];
                    for (const result of response.data) {
                        list.push(result.Date);
                    }
                    dates = list;
                }).then(() => {
                    plot([cases, dates], "japan");
                })
        })
        .catch(error => {
            console.log(error);
        });
}

function germany_data(plot) {
    let cases;
    let dates;
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    axios.get('https://api.covid19api.com/total/country/germany/status/confirmed?from=2020-04-15T00:00:00Z&to=' + date + 'T00:00:00Z')
        .then(response => {
            let list = [];
            for (const result of response.data) {
                list.push(result.Cases);
            }
            cases = list;
        }).then(() => {
            const today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            axios.get('https://api.covid19api.com/total/country/germany/status/confirmed?from=2020-04-15T00:00:00Z&to=' + date + 'T00:00:00Z')
                .then(response => {
                    let list = [];
                    for (const result of response.data) {
                        list.push(result.Date);
                    }
                    dates = list;
                }).then(() => {
                    plot([cases, dates], "germany");
                })
        })
        .catch(error => {
            console.log(error);
        });
}

function france_data(plot) {
    let cases;
    let dates;
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    axios.get('https://api.covid19api.com/total/country/france/status/confirmed?from=2020-04-15T00:00:00Z&to=' + date + 'T00:00:00Z')
        .then(response => {
            let list = [];
            for (const result of response.data) {
                list.push(result.Cases);
            }
            cases = list;
        }).then(() => {
            const today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            axios.get('https://api.covid19api.com/total/country/france/status/confirmed?from=2020-04-15T00:00:00Z&to=' + date + 'T00:00:00Z')
                .then(response => {
                    let list = [];
                    for (const result of response.data) {
                        list.push(result.Date);
                    }
                    dates = list;
                }).then(() => {
                    plot([cases, dates], "france");
                })
        })
        .catch(error => {
            console.log(error);
        });
}

function italy_data(plot) {
    let cases;
    let dates;
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    axios.get('https://api.covid19api.com/total/country/italy/status/confirmed?from=2020-04-15T00:00:00Z&to=' + date + 'T00:00:00Z')
        .then(response => {
            let list = [];
            for (const result of response.data) {
                list.push(result.Cases);
            }
            cases = list;
        }).then(() => {
            const today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            axios.get('https://api.covid19api.com/total/country/italy/status/confirmed?from=2020-04-15T00:00:00Z&to=' + date + 'T00:00:00Z')
                .then(response => {
                    let list = [];
                    for (const result of response.data) {
                        list.push(result.Date);
                    }
                    dates = list;
                }).then(() => {
                    plot([cases, dates], "italy");
                })
        })
        .catch(error => {
            console.log(error);
        });
}

function uk_data(plot) {
    let cases;
    let dates;
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    axios.get('https://api.covid19api.com/total/country/united-kingdom/status/confirmed?from=2020-04-15T00:00:00Z&to=' + date + 'T00:00:00Z')
        .then(response => {
            let list = [];
            for (const result of response.data) {
                list.push(result.Cases);
            }
            cases = list;
        }).then(() => {
            const today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            axios.get('https://api.covid19api.com/total/country/united-kingdom/status/confirmed?from=2020-04-15T00:00:00Z&to=' + date + 'T00:00:00Z')
                .then(response => {
                    let list = [];
                    for (const result of response.data) {
                        list.push(result.Date);
                    }
                    dates = list;
                }).then(() => {

                    plot([cases, dates], "uk");
                })
        })
        .catch(error => {
            console.log(error);
        });
}

function plot_data([y, x], country_name) {
    var info = [
        {
            x: x,
            y: y,
            type: 'scatter'
        }
    ];
    var data = [info]
    var graphOptions = { fileopt: "overwrite", filename: country_name }

    plotly.plot(data, graphOptions, (err, msg) => {
    });
}

function store_data([y, x], country_name) {

    let info = {
        y_axis: y,
        x_axis: x
    }
    const data = JSON.stringify(info);
    fs.writeFileSync('data/' + country_name + '.json', data);
}

async function scatter_all(msg) {


    canada_data(store_data);
    usa_data(store_data);
    japan_data(store_data);
    germany_data(store_data);
    france_data(store_data);
    italy_data(store_data);
    uk_data(store_data);


    let canada_info = JSON.parse(fs.readFileSync('data/canada.json'));

    var canada =
    {
        x: canada_info.x_axis,
        y: canada_info.y_axis,
        type: 'scatter',
        name: 'Canada'
    }

    let us_info = JSON.parse(fs.readFileSync('data/us.json'));
    var us =
    {
        x: us_info.x_axis,
        y: us_info.y_axis,
        type: 'scatter',
        name: 'USA'
    }

    let japan_info = JSON.parse(fs.readFileSync('data/japan.json'));
    var japan =
    {
        x: japan_info.x_axis,
        y: japan_info.y_axis,
        type: 'scatter',
        name: 'Japan'
    }

    let germany_info = JSON.parse(fs.readFileSync('data/germany.json'));
    var germany =
    {
        x: germany_info.x_axis,
        y: germany_info.y_axis,
        type: 'scatter',
        name: 'Germany'
    }

    let france_info = JSON.parse(fs.readFileSync('data/france.json'));
    var france =
    {
        x: france_info.x_axis,
        y: france_info.y_axis,
        type: 'scatter',
        name: 'France'
    }

    let italy_info = JSON.parse(fs.readFileSync('data/italy.json'));
    var italy =
    {
        x: italy_info.x_axis,
        y: italy_info.y_axis,
        type: 'scatter',
        name: 'Italy'
    }

    let uk_info = JSON.parse(fs.readFileSync('data/uk.json'));
    var uk =
    {
        x: uk_info.x_axis,
        y: uk_info.y_axis,
        type: 'scatter',
        name: 'UK'
    }

    var data = [canada, us, japan, germany, france, italy, uk];
    var graphOptions = { fileopt: "overwrite", filename: "compare" };

    plotly.plot(data, graphOptions, function (err, msg) {
    });

    const graph = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setAuthor('Sarah Spam Bot', 'https://cdn.discordapp.com/avatars/690299652389601530/02e17491d89149ea8d01c57038d73980.png')
        .setDescription('Number of Covid-19 patients vs time')
        .setTimestamp()
        .setFooter('Aryan had too much time to waste :)');

    const options = {
        url: 'https://plotly.com/[APPROPIATE_LINK]',
        dest: './graphs/compare.png'
    }

    try {
        const { filename, image } = await downloader.image(options);
        graph.setTitle('Comparison Covid-19 Graph').setURL('https://plotly.com/~[APPROPIATE_LINK]').attachFiles(filename).setImage('attachment://compare.png');
    } catch (err) {
        console.log("Downolader Error: " + err);
    }

    msg.channel.send(graph);

}

async function scatter_canada(msg) {

    canada_data(plot_data);

    const graph = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setAuthor('Sarah Spam Bot', 'https://cdn.discordapp.com/avatars/690299652389601530/02e17491d89149ea8d01c57038d73980.png', 'https://google.com')
        .setDescription('# of Canada Covid-19 patients vs time')
        .setTimestamp()
        .setFooter('Aryan had too much time to waste :)');

    const options = {
        url: 'https://plotly.com/~[APPROPIATE_LINK]',
        dest: './graphs/canada.png'
    }

    try {
        const { filename, image } = await downloader.image(options);
        graph.setTitle('Canada Covid-19 Graph').setURL('https://plotly.com/~[APPROPIATE_LINK]').attachFiles(filename).setImage('attachment://canada.png');
    } catch (err) {
        console.log("Downolader Error: " + err);
    }

    msg.channel.send(graph);

}

async function scatter_us(msg) {

    usa_data(plot_data);

    const graph = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setAuthor('Sarah Spam Bot', 'https://cdn.discordapp.com/avatars/690299652389601530/02e17491d89149ea8d01c57038d73980.png')
        .setDescription('# of US Covid-19 patients vs time')
        .setTimestamp()
        .setFooter('Aryan had too much time to waste :)');

    const options = {
        url: 'https://plotly.com/~[APPROPIATE_LINK]',
        dest: './graphs/usa.png'
    }

    try {
        const { filename, image } = await downloader.image(options);
        graph.setTitle('USA Covid-19 Graph').setURL('https://plotly.com/~[APPROPIATE_LINK]').attachFiles(filename).setImage('attachment://usa.png');
    } catch (err) {
        console.log("Downolader Error: " + err);
    }

    msg.channel.send(graph);
}

async function scatter_japan(msg) {

    japan_data(plot_data);

    const graph = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setAuthor('Sarah Spam Bot', 'https://cdn.discordapp.com/avatars/690299652389601530/02e17491d89149ea8d01c57038d73980.png')
        .setDescription('# of Japan Covid-19 patients vs time')
        .setTimestamp()
        .setFooter('Aryan had too much time to waste :)');

    const options = {
        url: 'https://plotly.com/~[APPROPIATE_LINK]',
        dest: './graphs/japan.png'
    }

    try {
        const { filename, image } = await downloader.image(options);
        graph.setTitle('Japan Covid-19 Graph').setURL('https://plotly.com/~[APPROPIATE_LINK]').attachFiles(filename).setImage('attachment://japan.png');
    } catch (err) {
        console.log("Downolader Error: " + err);
    }

    msg.channel.send(graph);

}

async function scatter_germany(msg) {

    germany_data(plot_data);

    const graph = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setAuthor('Sarah Spam Bot', 'https://cdn.discordapp.com/avatars/690299652389601530/02e17491d89149ea8d01c57038d73980.png')
        .setDescription('# of Germany Covid-19 patients vs time')
        .setTimestamp()
        .setFooter('Aryan had too much time to waste :)');

    const options = {
        url: 'https://plotly.com/~[APPROPIATE_LINK]/12.png',
        dest: './graphs/germany.png'
    }

    try {
        const { filename, image } = await downloader.image(options);
        graph.setTitle('Germany Covid-19 Graph').setURL('https://plotly.com/~[APPROPIATE_LINK]').attachFiles(filename).setImage('attachment://germany.png');
    } catch (err) {
        console.log("Downolader Error: " + err);
    }

    msg.channel.send(graph);

}

async function scatter_france(msg) {

    france_data(plot_data)

    const graph = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setAuthor('Sarah Spam Bot', 'https://cdn.discordapp.com/avatars/690299652389601530/02e17491d89149ea8d01c57038d73980.png')
        .setDescription('# of France Covid-19 patients vs time')
        .setTimestamp()
        .setFooter('Aryan had too much time to waste :)');

    const options = {
        url: 'https://plotly.com/~[APPROPIATE_LINK]/18.png',
        dest: './graphs/france.png'
    }

    try {
        const { filename, image } = await downloader.image(options);
        graph.setTitle('France Covid-19 Graph').setURL('https://plotly.com/~[APPROPIATE_LINK]').attachFiles(filename).setImage('attachment://france.png');
    } catch (err) {
        console.log("Downolader Error: " + err);
    }

    msg.channel.send(graph);

}

async function scatter_italy(msg) {

    italy_data(plot_data);

    const graph = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setAuthor('Sarah Spam Bot', 'https://cdn.discordapp.com/avatars/690299652389601530/02e17491d89149ea8d01c57038d73980.png')
        .setDescription('# of Italy Covid-19 patients vs time')
        .setTimestamp()
        .setFooter('Aryan had too much time to waste :)');

    const options = {
        url: 'https://plotly.com/~[APPROPIATE_LINK]/16.png',
        dest: './graphs/italy.png'
    }

    try {
        const { filename, image } = await downloader.image(options);
        graph.setTitle('Italy Covid-19 Graph').setURL('https://plotly.com/~[APPROPIATE_LINK]').attachFiles(filename).setImage('attachment://italy.png');
    } catch (err) {
        console.log("Downolader Error: " + err);
    }

    msg.channel.send(graph);

}

async function scatter_uk(msg) {

    uk_data(plot_data);

    const graph = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setAuthor('Sarah Spam Bot', 'https://cdn.discordapp.com/avatars/690299652389601530/02e17491d89149ea8d01c57038d73980.png')
        .setDescription('# of UK Covid-19 patients vs time')
        .setTimestamp()
        .setFooter('Aryan had too much time to waste :)');

    const options = {
        url: 'https://plotly.com/[APPROPIATE_LINK]',
        dest: './graphs/uk.png'
    }

    try {
        const { filename, image } = await downloader.image(options);
        graph.setTitle('UK Covid-19 Graph').setURL('https://plotly.com/~[APPROPIATE_LINK]').attachFiles(filename).setImage('attachment://uk.png');
    } catch (err) {
        console.log("Downolader Error: " + err);
    }

    msg.channel.send(graph);

}

function scatter_link(msg) {
    msg.channel.send('All: https://plotly.com/~[APPROPIATE_LINK]\nCanada: https://plotly.com/~[APPROPIATE_LINK]\nUSA: https://plotly.com/~[APPROPIATE_LINK]\nJapan: https://plotly.com/~[APPROPIATE_LINK]\nGermany: https://plotly.com/~[APPROPIATE_LINK]\nFrance: https://plotly.com/~[APPROPIATE_LINK]\nItaly: https://plotly.com/~[APPROPIATE_LINK]\nUK: https://plotly.com/~[APPROPIATE_LINK]');
}

client.login(auth.token);
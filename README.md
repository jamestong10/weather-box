# Weather Box
![](/images/taiwan_weather.jpg)

## [Demo][01] | [Github][02]

# 主題

天氣預報:一週氣象

## Yahoo Weather API

[Yahoo Weather API][03] 提供天氣資訊

API 使用 [YQL][04] 類似sql 語法查詢需要的氣象資訊，根據Yahoo 自訂世界地圖座標 WOEID (Where On Earth IDentifier) 作為查詢依據

`woeid` 尋找要查詢的城市，`u` 指定溫度是攝氏或華氏

```
select * from weather.forecast where woeid = '2306179' and u=c"
```

透過HTTP GET 取得氣象資訊
q：為yql
format：回傳格式

```
const query = escape("select * from weather.forecast where woeid ='" + woeid + "' and u='c'");
const endpoint = "https://query.yahooapis.com/v1/public/yql?q=" + query + "&format=json";
```

一週氣象、最高氣溫、最低氣溫路徑：`results.chaneel.item.forecast`

```
{
    "query": {
        "count": 1,
        "created": "2018-10-01T16:54:47Z",
        "lang": "en-US",
        "results": {
           // skip.
            "channel": {
                "item": {
                    "title": "Conditions for Taipei City, Taipei City, TW at 12:00 AM CST",
                    "lat": "25.086",
                    "long": "121.560997",
                    "link": "http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2306179/",
                    "pubDate": "Tue, 02 Oct 2018 12:00 AM CST",
                    "condition": {
                        "code": "33",
                        "date": "Tue, 02 Oct 2018 12:00 AM CST",
                        "temp": "23",
                        "text": "Mostly Clear"
                    },
                    "forecast": [
                        {
                            "code": "30",
                            "date": "02 Oct 2018",
                            "day": "Tue",
                            "high": "27",
                            "low": "22",
                            "text": "Partly Cloudy"
                        }
                    ]
                }
            }
        }
    }
}
```

forecast 資料結構

code: [天氣代碼][05]

date: 日期

day: 星期

high: 最高氣溫

low: 最低氣溫

text: 天氣代碼說明

```
"code": "30",
"date": "02 Oct 2018",
"day": "Tue",
"high": "27",
"low": "22",
"text": "Partly Cloudy"
```

## Weather Icons

提供222 種天氣圖示和CSS

製作時，發現的好用套件，更多說明可以參考[官網][06]

套用：建立font 資料夾存放5 個字型檔與css 資料夾同層

```
<link rel="stylesheet" href="css/weather-icons.min.css">
```

根據要使用的天氣套用對應的class

```
<i class="wi wi-night-sleet"></i>
```

作者有針對[Yahoo][07] 設定對應的天氣

可以省去建立代碼對照表的工程

數字帶入回傳的`code`

```
<i class="wi wi-yahoo-7"></i>
```

[01]:https://jamestong10.github.io/weather-box/
[02]:https://github.com/jamestong10/weather-box
[03]:https://developer.yahoo.com/weather/
[04]:https://developer.yahoo.com/yql/
[05]:https://developer.yahoo.com/weather/documentation.html
[06]:https://erikflowers.github.io/weather-icons/
[07]:https://erikflowers.github.io/weather-icons/api-list.html
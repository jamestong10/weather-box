# Weather Box
![](/images/taiwan_weather.jpg)

## [Demo][01] | [Github][02]

# 主題

天氣預報: 一週氣象

## Yahoo Weather API

可以在 [Yahoo Weather API][03] 抓取天氣資訊

使用Yahoo 自訂世界地圖座標 WOEID (Where On Earth IDentifier)

API 使用 [YQL][04] 類似sql 語法查詢需要的氣象資訊

使用 woeid 尋找要查詢的城市，u 指定溫度是攝氏或華氏

```
select * from weather.forecast where woeid = '2306179' and u=c")
```

透過HTTP GET 取得氣象資訊
q：為yql
format：回傳格式

```
const query = escape("select * from weather.forecast where woeid ='" + woeid + "' and u='c'");
const endpoint = "https://query.yahooapis.com/v1/public/yql?q=" + query + "&format=json";
```

一週氣象、最高氣溫、最低氣溫路徑：`results.chaneel.item.forecast`

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
low:  最低氣溫
text: 天氣代碼說明

```
"code": "30",
"date": "02 Oct 2018",
"day": "Tue",
"high": "27",
"low": "22",
"text": "Partly Cloudy"
```

[01]:https://jamestong10.github.io/weather-box/
[02]:https://github.com/jamestong10/weather-box
[03]:https://developer.yahoo.com/weather/
[04]:https://developer.yahoo.com/yql/
[05]:https://developer.yahoo.com/weather/documentation.html
| **Input**           | **Expected Output** | **Explanation**                         |
|---------------------|---------------------|-----------------------------------------|
| `"123abc"`          | `"abc"`             | Removes leading numbers                 |
| `"_$testVar"`       | `"testVar"`         | Removes leading `_` and `$`             |
| `"!@#varName"`      | `"varName"`         | Removes leading special characters      |
| `"my-var"`          | `"myvar"`           | Removes non-alphanumeric characters     |
| `"hello world"`     | `"helloworld"`      | Removes spaces                          |
| `"some%weird$name"` | `"someweirdname"`   | Removes `%` and `$`                     |
| `"1234"`            | `""`                | No valid starting letter, returns empty |
| `"!@#$%^&*()"`      | `""`                | No valid characters, returns empty      |
| `null`              | `""`                | Handles null safely                     |
| `undefined`         | `""`                | Handles undefined safely                |
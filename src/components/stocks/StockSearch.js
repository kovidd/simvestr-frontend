import React, { useState, useEffect, useRef, useContext } from "react";
import { throttle } from "throttle-debounce";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { stockDetails, searchStockByName } from "../../services/stock";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { NotificationContext } from "../ui/Notification";

export const StockSearch = ({ setDetails, setIsLoading }) => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const { setNotification } = useContext(NotificationContext);

  const getOptions = async (name) => {
    const res = await searchStockByName(name);
    if (!res.error) {
      return res.data.map((item) => ({
        symbol: item.symbol,
        displaySymbol: item.display_symbol,
        name: item.name,
      }));
    } else {
      console.error("Error searching for stocks.");
      return null;
    }
  };

  const handleSearch = useRef(
    throttle(500, async (active, value, inputValue) => {
      let res = await getOptions(inputValue);
      if (active) {
        let newOptions = [];
        if (value) {
          newOptions = [value];
        }
        if (res) {
          newOptions = [...newOptions, ...res];
        }
        setOptions(newOptions);
      }
    })
  );

  useEffect(() => {
    let active = true;

    if (inputValue === "" || inputValue.length < 2) {
      setOptions(value ? [value] : []);
      return undefined;
    }

    async function getStockDetails(stockSymbol) {
      if (value) {
        setIsLoading(true);
        const res = await stockDetails(stockSymbol);
        if (!res.error) {
          setDetails({
            quote: Object.fromEntries(
              Object.entries(res.data.quote).map(([k, v]) => [k, parseFloat(v)])
            ),
            logo: res.data.logo,
            exchange: res.data.exchange.split(" ")[0],
            symbol: res.data.symbol,
            name: res.data.name,
            industry: res.data.industry,
            marketCapitalization: parseInt(res.data.marketCapitalization),
          });
        } else {
          setDetails(null);
          setNotification({
            open: true,
            message: `Error getting stock details for ${stockSymbol}.`,
          });
        }
        setIsLoading(false);
      }
    }

    // gets the search results (dropdown) using a throttle
    handleSearch.current(active, value, inputValue);

    if (value && value.symbol === inputValue) {
      getStockDetails(value.symbol);
    }

    return () => {
      active = false;
    };
  }, [
    value,
    inputValue,
    handleSearch,
    setDetails,
    setIsLoading,
    setNotification,
  ]);

  return (
    <Autocomplete
      freeSolo
      id="stock-search"
      disableClearable
      blurOnSelect
      value={value}
      filterOptions={(x) => x}
      filterSelectedOptions
      onChange={(_, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      options={options}
      getOptionLabel={(option) => option.symbol}
      renderOption={(option, { inputValue }) => {
        const renderedText = `${option.symbol} - ${option.name}`;
        const matches = match(renderedText, inputValue);
        const parts = parse(renderedText, matches);
        return (
          <>
            {parts.map((part, index) => (
              <span
                key={index}
                style={{
                  whiteSpace: "pre",
                  fontWeight: part.highlight ? 700 : 400,
                }}
              >
                {part.text}
              </span>
            ))}
          </>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Stocks"
          margin="normal"
          variant="outlined"
          InputProps={{ ...params.InputProps, type: "search" }}
        />
      )}
    />
  );
};

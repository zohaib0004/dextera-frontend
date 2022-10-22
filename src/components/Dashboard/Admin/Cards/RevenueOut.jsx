/** @format */

import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from "react-redux";
import { revenueOutActive } from "../../../../redux/features/sidebarSlice";
import { useEffect } from "react";
import axios from "axios";

export const RevenueOutCards = ({ isWeekly }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.user);
  const [currentRevenue, setCurrentRevenue] = useState(0);

  const amount = () => {
    switch (isWeekly) {
      case "daily":
        return 35;
      case "weekly":
        return 240;
      case "monthly":
        return 4520;
      case "quarterly":
        return 18080;
      case "yearly":
        return 72320;
      case "range":
        return 500;
    }
  };

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/revenue-out/?user=${user.id}`, {}, config).then((response) => {
        const data = response.data;
        if (data) {
          const newData = data.map((item) => ({ ...item, amount: Number(item.amount.split(".")[0]) }));
          const calculatedRevenue = newData.reduce((prevVal, currentVal) => prevVal + currentVal.amount, 0)
          setCurrentRevenue(calculatedRevenue);
        }
      })
  }
  return (
    <Grid container>
      <Grid item lg={12}>
        <Typography sx={{ fontSize: "1.3rem" }} color="blue" gutterBottom>
          Revenue out
        </Typography>
        <Typography
          variant="h3"
          mt={3}
          component="h4"
          sx={{ fontSize: "2.2rem" }}
        >
          <NumberFormat
            value={currentRevenue}
            displayType={"text"}
            thousandSeparator={true}
            prefix="$"
          />
        </Typography>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => ({
  isWeekly: state.data.isWeekly,
});

export default connect(mapStateToProps)(RevenueOutCards);

/** @format */

import React, { useEffect, useState } from "react";
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
import { revenueInActive } from "../../../../redux/features/sidebarSlice";
import axios from "axios";

export const RevenueInCards = ({ isWeekly }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.user);
  const [currentRevenue, setCurrentRevenue] = useState(0);
  const amount = () => {
    switch (isWeekly) {
      case "daily":
        return 460;
      case "weekly":
        return 3254;
      case "monthly":
        return 32564;
      case "quarterly":
        return 130256;
      case "yearly":
        return 521024;
      case "range":
        return 1500;
    }
  };

  useEffect(() => {
    getData()
  }, [])


  const getData = () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/revenue-in/?user=${user.id}`, {}, config).then((response) => {
          const data = response?.data;
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
          Revenue In
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

export default connect(mapStateToProps)(RevenueInCards);

"use client";

import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { ViewIcon, ViewOffSlashIcon } from "../icons/huge-icons";

const InputPassword = ({
  classNames,
  control,
  defaultValue = "",
  name,
  rules,
  ...fieldProps
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Controller
      name={name}
      defaultValue={defaultValue} // כאן אנו מגדירים את הערך ההתחלתי
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          type={showPassword ? "text" : "password"}
          {...field}
          {...fieldProps}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                    className="*:text-slate-400"
                  >
                    {showPassword ? <ViewOffSlashIcon /> : <ViewIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  );
};

export default InputPassword;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserPreferencesState {
  theme: "light" | "dark";
  language: string;
}

const initialState: UserPreferencesState = {
  theme: "light",
  language: "en",
};

const userPreferencesSlice = createSlice({
  name: "userPreferences",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { setTheme, setLanguage } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;

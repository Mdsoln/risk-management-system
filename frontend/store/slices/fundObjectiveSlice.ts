// fundObjectiveSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { AppThunk } from '../store';
import { FundObjective } from "../../app/types/api";
import { getFundObjectives } from "../../app/services/api/fundObjectiveApi";
// import { PaginationParams, PaginationResult } from '@/app/types/api/PaginationData';
import { PaginationResult } from "@/app/types/api/PaginationData";

interface FundObjectiveState {
  fundObjectives: FundObjective[];
  loading: boolean;
  error: string | null;
  totalItems: number;
  totalPages: number;
}

const initialState: FundObjectiveState = {
  fundObjectives: [],
  loading: false,
  error: null,
  totalItems: 0,
  totalPages: 0,
};

const fundObjectiveSlice = createSlice({
  name: "fundObjective",
  initialState,
  reducers: {
    getFundObjectivesStart(state) {
      state.loading = true;
      state.error = null;
    },
    getFundObjectivesSuccess(
      state,
      action: PayloadAction<PaginationResult<FundObjective>>
    ) {
      state.loading = false;
      state.error = null;
      state.fundObjectives = action.payload.items; // Assuming 'data' property exists
      state.totalItems = action.payload.totalItems;
      state.totalPages = action.payload.totalPages;
    },
    getFundObjectivesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getFundObjectivesStart,
  getFundObjectivesSuccess,
  getFundObjectivesFailure,
} = fundObjectiveSlice.actions;

export default fundObjectiveSlice.reducer;

export const fetchFundObjectives =
  (params: any): any =>
  async (
    dispatch: (arg0: {
      payload: string | PaginationResult<FundObjective> | undefined;
      type:
        | "fundObjective/getFundObjectivesStart"
        | "fundObjective/getFundObjectivesSuccess"
        | "fundObjective/getFundObjectivesFailure";
    }) => void
  ) => {
    try {
      dispatch(getFundObjectivesStart());
      const fundObjectivesResult = await getFundObjectives(params);
      dispatch(getFundObjectivesSuccess(fundObjectivesResult));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      dispatch(getFundObjectivesFailure(errorMessage));
    }
  };

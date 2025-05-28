'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { RegulatoryComplianceMatrixPojo, RegulatoryComplianceMatrixSectionPojo } from '@/app/types/api';
import axios from 'axios';
import { API_BASE_URL } from '@/app/constants/api';

const RegulatoryComplianceMatrixReport = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [matrices, setMatrices] = useState<RegulatoryComplianceMatrixPojo[]>([]);

  const fetchReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/compliance/matrix/report`);
      if (response.data.status === 'SUCCESS') {
        setMatrices(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch report');
      }
    } catch (err) {
      setError('Error fetching report. Please try again.');
      console.error('Error fetching report:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/compliance/matrix/report/generate`);
      if (response.data.status === 'SUCCESS') {
        setMatrices(response.data.data);
      } else {
        setError(response.data.message || 'Failed to generate report');
      }
    } catch (err) {
      setError('Error generating report. Please try again.');
      console.error('Error generating report:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const getComplianceStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'compliant':
        return '#4caf50'; // Green
      case 'partially compliant':
        return '#ff9800'; // Orange
      case 'non-compliant':
        return '#f44336'; // Red
      default:
        return '#9e9e9e'; // Grey
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Card>
          <CardContent>
            <Typography color="error">{error}</Typography>
            <Button variant="contained" onClick={fetchReport} sx={{ mt: 2 }}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Regulatory Compliance Matrix Report</Typography>
        <Button variant="contained" onClick={generateReport}>
          Regenerate Report
        </Button>
      </Box>

      {matrices.length === 0 ? (
        <Card>
          <CardContent>
            <Typography>No compliance matrices found. Please create some matrices first.</Typography>
          </CardContent>
        </Card>
      ) : (
        matrices.map((matrix) => (
          <Card key={matrix.id} sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {matrix.itemNumber}: {matrix.details}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Department: {matrix.department?.name || 'N/A'}
              </Typography>

              {matrix.sections && matrix.sections.length > 0 ? (
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Item Number</TableCell>
                        <TableCell>Details</TableCell>
                        <TableCell>Compliance Status</TableCell>
                        <TableCell>Score</TableCell>
                        <TableCell>Comment</TableCell>
                        <TableCell>Recommendation</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {matrix.sections.map((section: RegulatoryComplianceMatrixSectionPojo) => (
                        <TableRow key={section.id}>
                          <TableCell>{section.itemNumber}</TableCell>
                          <TableCell>{section.details}</TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                backgroundColor: getComplianceStatusColor(section.complianceStatus?.statusName || ''),
                                color: 'white',
                                p: 1,
                                borderRadius: 1,
                                display: 'inline-block',
                              }}
                            >
                              {section.complianceStatus?.statusName || 'N/A'}
                            </Box>
                          </TableCell>
                          <TableCell>{section.complianceStatus?.score || 'N/A'}</TableCell>
                          <TableCell>{section.comment || 'N/A'}</TableCell>
                          <TableCell>{section.recommendation || 'N/A'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  No sections found for this matrix.
                </Typography>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default RegulatoryComplianceMatrixReport;
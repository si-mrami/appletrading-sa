import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CssBaseline, Paper, Typography, Button, CircularProgress, Grid, Snackbar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { baseUrl } from '../enveronment.js';


const ApproveReview = () => {
  const { id } = useParams();
//   console.log("Review ID:", id);

  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApprovedMessage, setShowApprovedMessage] = useState(false);

//   const baseUrl = getBaseUrl();

  useEffect(() => {
    // console.log("useEffect triggered");
    const fetchReview = async () => {
      try {
        let getreview = `${baseUrl}get-review/${id}`;
        const response = await fetch(getreview);
        if (response.ok) {
          const data = await response.json();
        //   console.log("Fetched Data:", data);
          setReview(data);
        } else {
        //   console.error('Failed to fetch review');
        }
      } catch (error) {
        // console.error('Failed to fetch review:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchReview();
  }, [id]);

  const handleApprove = async () => {
    try {
      setLoading(true);
      let approvereview = `${baseUrl}approve-review/${id}`;
      const response = await fetch(approvereview, {
        method: 'POST',
      });

      if (response.ok) {
        setShowApprovedMessage(true);
      } else {
        // console.error('Failed to approve review');
      }
    } catch (error) {
    //   console.error('Failed to approve review:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="approve-review-container">
      <CssBaseline />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
            <Typography variant="h5" gutterBottom>
              Review Details
            </Typography>
            {loading ? (
              <CircularProgress color="primary" />
            ) : review ? (
              <div className="review-details">
                <Typography variant="subtitle1">Name: {review.fullName}</Typography>
                <Typography variant="subtitle1">Email: {review.email}</Typography>
                <Typography variant="subtitle1">
                  Rating: {Array.from(Array(review.rating)).map((_, index) => (
                    <StarIcon key={index} fontSize="small" style={{ color: 'yellow' }} />
                  ))}
                </Typography>
                <Typography variant="subtitle1">Comment: {review.comment}</Typography>
                {!review.approved && (
                  <Button onClick={handleApprove} variant="contained" color="primary" style={{ marginRight: '10px' }}>
                    Approve Review
                  </Button>
                )}
                <Button component={Link} to={`/disapprove-review/${id}`} variant="contained" color="secondary">
                  Disapprove Review
                </Button>
                <Snackbar
                  open={showApprovedMessage}
                  autoHideDuration={9000}
                  onClose={() => setShowApprovedMessage(false)}
                  message="Review Approved"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  sx={{ backgroundColor: 'green', color: 'white' }}
                />
              </div>
            ) : (
              <Typography variant="subtitle1">Loading...</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ApproveReview;

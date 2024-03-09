import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { CssBaseline, Paper, Typography, Button, CircularProgress, Grid, Snackbar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { baseUrl } from '../enveronment.js';


const DisapproveReview = () => {
  const { id } = useParams();

  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDisapprovedMessage, setShowDisapprovedMessage] = useState(false);

//   const baseUrl= getBaseUrl();

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

  const handleDisapprove = async () => {
    try {
      setLoading(true);
      let disaprovereview = `${baseUrl}disapprove-review/${id}`;
      const response = await fetch(disaprovereview, {
        method: 'POST',
      });

      if (response.ok) {
        setShowDisapprovedMessage(true);
      } else {
        // console.error('Failed to disapprove review');
      }
    } catch (error) {
    //   console.error('Failed to disapprove review:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="disapprove-review-container">
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
                {!review.approved && !showDisapprovedMessage && (
                  <Button onClick={handleDisapprove} variant="contained" color="secondary">
                    Disapprove Review
                  </Button>
                )}
                {showDisapprovedMessage && (
                  <Snackbar
                    open={showDisapprovedMessage}
                    onClose={() => setShowDisapprovedMessage(false)}
                    message="Review Disapproved"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    sx={{ backgroundColor: 'red', color: 'green' }}
                  />
                )}
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

export default DisapproveReview;

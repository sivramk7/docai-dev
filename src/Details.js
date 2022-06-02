import { useState } from 'react';
import { Box, Typography, TableContainer, TableHead, TableRow, TableCell, TableBody, Table, Paper, Card, CardContent, Stack, IconButton } from '@mui/material';
import EntityInfoDialog from './EntityInfoDialog';
import InfoIcon from '@mui/icons-material/Info';
import PropTypes from 'prop-types';

/**
 * props
 * * data - The JSON object
 * @param {*} props 
 * @returns 
 */
function Details(props) {
  const [open, setOpen] = useState(false)
  const [entity, setEntity] = useState(null)
  if (props.data === null) {
    return <Box>No Data</Box>
  }
  const doc = props.data.document;
  return (
    <Box sx={{ overflowY: "auto" }}>
      <Paper sx={{ margin: "4px" }}>
        <Stack direction="column" spacing={1}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">Details</Typography>
              <Typography variant="body1" component="ul">
                <li>Uri: {doc.uri ? doc.uri : "<none>"}</li>
                <li>MimeType: {doc.mimeType}</li>
                <li>Page Count: {doc.pages.length}</li>
                <li>Human review status: {props.data.humanReviewStatus.state}</li>
              </Typography>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">Pages</Typography>
              <TableContainer>
                <Table size="smalll">
                  <TableHead>
                    <TableRow>
                      <TableCell>Page Number</TableCell>
                      <TableCell>Width</TableCell>
                      <TableCell >Height</TableCell>
                      <TableCell>Units</TableCell>
                      <TableCell>Languages</TableCell>
                      <TableCell>Blocks</TableCell>
                      <TableCell>Paragraphs</TableCell>
                      <TableCell>Lines</TableCell>
                      <TableCell>Tokens</TableCell>
                      <TableCell>Tables</TableCell>
                      <TableCell>Form Fields</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {doc.pages.map((page) => (
                      <TableRow key={page.pageNumber}>
                        <TableCell>
                          {page.pageNumber}
                        </TableCell>
                        <TableCell >{page.dimension.width}</TableCell>
                        <TableCell >{page.dimension.height}</TableCell>
                        <TableCell >{page.dimension.unit}</TableCell>
                        <TableCell>{page.detectedLanguages.map((detectedLanguage) => (`${detectedLanguage.languageCode} `))}</TableCell>
                        <TableCell >{page.blocks.length}</TableCell>
                        <TableCell >{page.paragraphs.length}</TableCell>
                        <TableCell >{page.lines.length}</TableCell>
                        <TableCell >{page.tokens.length}</TableCell>
                        <TableCell >{page.tables.length}</TableCell>
                        <TableCell >{page.formFields.length}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
          {
            //
            // ENTITIES
            //
          }
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">Entities</Typography>
              <TableContainer>
                <Table size="smalll">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Confidence</TableCell>
                      <TableCell>Text</TableCell>
                      <TableCell>Normalized</TableCell>
                      <TableCell>Properties</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {doc.entities.map((entity) => (
                      <TableRow key={entity.id}>
                        <TableCell>
                          <IconButton color="primary" size="small" onClick={() => { setOpen(true); setEntity(entity) }}>
                            <InfoIcon />
                          </IconButton>
                          {entity.id}
                        </TableCell>
                        <TableCell>{entity.type}</TableCell>
                        <TableCell>{entity.confidence}</TableCell>
                        <TableCell>{entity.mentionText}</TableCell>
                        <TableCell>{entity.normalizedValue ? entity.normalizedValue.text : ""}</TableCell>
                        <TableCell>{entity.properties ? entity.properties.length : 0}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Stack>
      </Paper>
      <EntityInfoDialog open={open} entity={entity} close={() => { setOpen(false) }} />
    </Box >
  )
} // Details

Details.propTypes = {
  'data': PropTypes.object.isRequired
}

export default Details
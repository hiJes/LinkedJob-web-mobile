import { gql } from '@apollo/client';

const DATA_JOBS = gql`
  query ShowAllJob {
    showAllJob {
      id
      title
      description
      Company {
        name
        location
        companyLogo
      }
      companyId
      userMongoId
      jobType
    }
  }
`

const DATA_JOB = gql`
  query ShowJobById($showJobByIdId: ID) {
    showJobById(id: $showJobByIdId) {
      id
      title
      description
      Company {
        name
        companyLogo
        location
      }
      companyId
      userMongoId
      jobType
    }
  }
`

module.exports = {
  DATA_JOBS,
  DATA_JOB
}
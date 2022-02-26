import styled from '@emotion/styled'

const HomeContainer = styled.div`
  .home-title {
    margin-bottom: 32px; 
  }

  .home-section {
    display: flex; 
    align-items: space-between; 
    .card-balance {
      max-width: 500px;
      margin-right: 24px;
    }

    .transaction-article {
      width: 500px;

      .transaction-paper {
        padding: 48px;

        .transaction-title {
          margin-bottom: 16px;
        }

        .transaction-form {
          display: flex; 
          align-items: flex-end; 
        }
      }

    }
  }

  
`

export default HomeContainer
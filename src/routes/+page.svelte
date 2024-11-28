<script>
  // No JavaScript needed for static page
</script>

<div class="mac-error-screen">
  <div class="error-box">
    <div class="error-content">
      <div class="error-icon">
        <span class="bomb">💣</span>
      </div>
      <div class="error-code">ID 01</div>
      <div class="error-text">
        Sorry, but Moodmix has been shut down.
      </div>
      <div class="error-details">
        Due to the prohibitive costs of hosting and 
        maintaining our own AI model, we had to 
        discontinue this service.
      </div>
    </div>
  </div>
</div>

<style>
  @font-face {
    font-family: 'ChicagoFLF';
    src: url('https://dl.dropboxusercontent.com/s/g8xwlvvxhc4s0dg/ChicagoFLF.ttf') format('truetype');
  }

  .mac-error-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #fff;
    font-family: 'ChicagoFLF', monospace;
  }

  .error-box {
    background-color: #fff;
    border: 3px solid #000;
    width: 512px;
    padding: 16px;
    box-shadow: 3px 3px 0 #000;
  }

  .error-content {
    text-align: center;
  }

  .error-icon {
    margin: 20px 0;
  }

  .bomb {
    font-size: 64px;
    line-height: 1;
  }

  .error-code {
    font-size: 14px;
    margin-bottom: 16px;
  }

  .error-text {
    font-size: 18px;
    margin-bottom: 16px;
    padding: 0 20px;
  }

  .error-details {
    font-size: 14px;
    margin: 0 auto;
    max-width: 400px;
    line-height: 1.4;
    padding: 0 20px;
  }

  /* Classic Mac button style */
  .error-box::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    border: 1px solid #000;
  }
</style>

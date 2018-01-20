# DonateStellar for a good cause

![Donate](./media/donatestellar.jpg)

## What is DonateStellar?
**DonateStellar** is a simple library that easily enables your website to receive donations in XLM Lumens, the currency used in the Stellar Network as the leading platform for instant transactions worldwide.

## How to use it?
In order to use **DonateStellar** on your site you need to follow these easy steps:

- Have a Stellar account with at least 1 XLM in funds
- Download the DonateStellar.js file from [here](./scripts/donatestellar.js)
- Download the DonateStellar.jpg image from [here](./media/donatestellar.jpg)
- Add a click event to the donation image:
````HTML
<img src="donatestellar.jpg" onclick="DonateStellar.donation(event)">
````
- Add the DonateStellar.js library at the end of your html code
````HTML
<script src="donatestellar.js"></script>
````
- Initialize the script with your address and any other options on window.load:
````JS
DonateStellar.setup({address:'G123456YOURADDRESSHERE'});
````

### Available options:

- `horizon` test or live (default). Use test for playing with it until ready.
- `address` your Stellar public key (required). You can use live or testing accounts.
- `cause` A short explanation of the donation purpose like 'Save the children' or 'Help developers' (optional).
- `onConfirm` A reference to a method you would like to call when donations are confirmed (optional).
- `onCancel` A reference to a method you would like to call when donations are cancelled (optional).

### Simple implementation:

This is the simplest implementation, all it needs is your Stellar address and nothing else:

````JS
DonateStellar.setup({address:'G123456YOURADDRESSHERE'});
````

### Advanced implementation:

An advanced implementation allows you to select live or testing networks, provide a cause for the donation, and your own post-processing methods after confirmation or cancellation events.

````JS
DonateStellar.setup({
  horizon   : 'test',
  address   : 'G123456YOURADDRESSHERE',
  cause     : 'Save the children of the world!',
  onConfirm : myDonationConfirmation,
  onCancel  : myDonationCancellation
});
````

### Post-process methods:

They are optional and allow you to perform extra validation steps after donations are confirmed or cancelled, like sending emails to benefactors, url redirections, etc.

Confirmation events pass two parameters to the receiving method as reference id and transaction id. Refid was used in the memo field of the donation for confirmation, while txid is the actual transaction in the Stellar blockchain if you want to perform extra validation on your server.

Here is a sample use:

````JS
function myDonationConfirmation(refid, txid) {
    if(DonateStellar.confirmed() == refid){
        alert('Thank you for your donation!');
        // Confirmed transaction id {txid}
        // Verify stellar transaction txid, source, target, amount, asset, memo
        // Send txid to server for further confirmation
    }
}

function myDonationCancellation() {
    alert("Children of the world need your help!'");
    // Show sad face on your page
    // Any url redirection
}
````

## Ok, how much does it cost?
Nothing. If you are a web developer and have basic html and javascript knowledge you can do it all by yourself in less than ten minutes. If you need help please [open an issue](https://github.com/kuyawa/DonateStellar/issues) and we will gladly lend a hand. Feedback is always welcome and we appreciate all input.

## Can I use that cool image in my own site?
Sure! Go ahead and spread the love for Stellar, the world will be a better place if we all do, what's not to love about helping good will causes using a highly reliable platform like the Stellar Network? Children of the world will definitely thank you. And Stellar developers too :)

![Donate](./media/donatestellar.jpg)

You can see it running in this test site, play with it and pay with fake money to test the power of instant payments with Stellar.

[DonateStellar Test Site](https://myplaynet.herokuapp.com/donatestellar)

And please donate to help create more tools for the Stellar platform

    GALT5LR4TDTR5TX7GFHYZQIZRDD6HX32YHXYII7CAFG3ZOZALZUYGMZK

----

External libraries

- Stellar SDK by the Stellar Foundation - https://github.com/stellar/js-stellar-sdk/
- QRCode JS by David Shim - https://github.com/davidshimjs/qrcodejs
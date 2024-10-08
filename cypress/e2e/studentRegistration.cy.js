describe('Webcam Spec', () => {
  beforeEach(() => {
    cy.on('window:load', (win) => {
      const iframe = win.parent.document.querySelector('.aut-iframe'); // Adjust the selector as needed
      if (iframe) {
        iframe.setAttribute('allow', 'camera;microphone');
      }
    });
  });

  it('Submit New User FullFlow with Face Capture Simulation', () => {
    // Visit the registration page
    cy.visit('https://digival-staging-nginx-ds-yk25kmkzeq-el.a.run.app/staging1-dcweb/auth/register', {
      failOnStatusCode: false,
    });

    // Define test data
    const email = "akashAs@mail.com";
    const email1 = "akashAs@gmail.com";
    const firstName = 'Akash';
    const enterOtp = "1234";
    const password = "12345678";
    const password1 = "123456";
    const confirmPassword = "12345678";
    const academicId = "A123456789";
    const mobileNumber = "6374142625";
    const gender = "male"; // or "female" based on your selection
    // cy.get("img").should("exist").and('be.visible');
    // Step 1: Enter email and submit
    cy.get('input[type="email"]').should("exist").type(email);
    cy.get('input[type="email"]').should("have.value", email);

    // Step 2: Submit the form
    cy.get("button.buttonfx").should("exist").should("not.be.disabled").click();

    // Step 3: Enter OTP and verify
    cy.get('[placeholder="Enter OTP"]').should("exist").type(enterOtp);
    cy.get('[placeholder="Enter OTP"]').should("have.value", enterOtp);
    cy.get("button.verify-button").should("exist").should("not.be.disabled").click();

    // Step 4: Enter password and confirm password
    cy.get('[placeholder="Enter Password"]').should("exist").type(password);
    cy.get('[placeholder="Enter Password"]').should("have.value", password);
    cy.get('[placeholder="Confirm Password"]').should("exist").type(confirmPassword);
    cy.get('[placeholder="Confirm Password"]').should("have.value", confirmPassword);

    // Step 5: Submit the form
    cy.get("button.verify-button").should("exist").should("not.be.disabled").click();

    // Step 6: Enter Name details
    cy.get('input[placeholder="First Name *"]').should("exist").type(firstName);
    cy.get('input[placeholder="Middle Name"]').should("exist").type("A");
    cy.get('input[placeholder="Last Name *"]').should("exist").type("H");

    // // // Step 7: Trigger the face capture
    // cy.contains("Face Authentication").should("exist");
    // cy.get('button').contains("Face Capture").should("exist").click();

    // // Wait for the video element to be visible
    // cy.get('video.oval-webcam').should('be.visible');
    // // Simulate starting the video stream
    // cy.get('video.oval-webcam').then((video) => {
    // });
    // cy.get("button").contains("save").should("exist").click();
    //   cy.window().then((win) => {
    //     // Assuming 'faceClear' and 'capturedImages' are in the window object
    //     // You can mock these values or update the React component state to simulate this behavior
    //     win.faceClear = true;  // Set faceClear to false
    //     win.capturedImages = ['TracklyBg.jpg']; // Set capturedImages with at least one item
    //   });
    //   // Now check if the image is visible
    //   cy.get('img').should('exist'); // Ensure the image exists in the DOM
    //   cy.wait(1000); // Wait for 1 second (adjust if needed)
      
    //   cy.get('img')
    //     .and(($img) => {
    //       // Get the img's src attribute
    //       const src = $img.attr('src');
  
    //       // You can verify the src contains your expected image source
    //       // This could be a base64 string or a URL depending on your case
    //       expect(src).to.include('TracklyBg.jpg'); // Modify as needed
  
    //       // Optionally, verify the image dimensions
    //       expect($img).to.have.attr('height', '150px');
    //       expect($img).to.have.css('width', '13em'); // Check if the uploaded file is correct
    //   })

    // Step 8: Enter Academic ID
    cy.get('input[placeholder="Academic ID *"]').should("exist").type(academicId);
    cy.get('input[placeholder="Academic ID *"]').should("have.value", academicId);

    // Step 9: Enter Mobile Number
    cy.get('input[placeholder="Mobile Number *"]').should("exist").type(mobileNumber);
    cy.get('input[placeholder="Mobile Number *"]').should("have.value", mobileNumber);

    // Step 10: Select Gender
    cy.get(`input[value="${gender}"]`).check().should('be.checked'); // Adjust based on the selected gender
    cy.get('input[value="female"]').should('not.be.checked');

    // Step 11: Upload ID card document
    cy.contains("Upload your ID card").should("exist");

    // Click the Upload file button
    cy.contains('Upload file').should('be.visible').click();
    cy.get('input[type="file"]').attachFile('TracklyBg.jpg').then(() => {
      cy.get('input[type="file"]').then((input) => {
        const fileName = input[0].files[0].name; // Access the file name
        expect(fileName).to.equal('TracklyBg.jpg'); // Check if the uploaded file is correct
      });
    });

    cy.wait(800);
    // cy.contains('Submit').should('be.visible').click({ force: true });
    cy.visit('https://digival-staging-nginx-ds-yk25kmkzeq-el.a.run.app/staging1-dcweb/auth/login', {
      failOnStatusCode: false,
    });
    cy.get('input[type="input"]').should("exist").type(email1);
    cy.get('input[type="input"]').should("have.value", email1);

    cy.get('input[type="password"]').should("exist").type(password1);
    cy.get('input[type="password"]').should("have.value", password1);

    cy.get("button").contains("LOGIN").should("exist").click();
  });
});

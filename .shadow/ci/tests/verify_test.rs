use std::process::Command;

#[test]
fn deterministic_verifier_requires_an_explicit_repository() {
    let output = Command::new(env!("CARGO_BIN_EXE_shadow-ci"))
        .arg("verify")
        .env_remove("REPO")
        .env_remove("GITHUB_REPOSITORY")
        .output()
        .expect("run shadow-ci verify");
    assert!(!output.status.success());
    assert!(
        String::from_utf8_lossy(&output.stderr).contains("REPO or GITHUB_REPOSITORY is required")
    );
}
